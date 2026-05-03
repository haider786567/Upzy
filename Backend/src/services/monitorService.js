import axios from "axios";
import Monitor from "../models/monitor.model.js";
import Log from "../models/log.model.js";
import * as incidentService from "./incidentService.js";
import { getIO } from "../socket/socket.js";

// tune these once, don’t scatter magic numbers
const DEGRADED_THRESHOLD_MS = 1000;

// axios instance (no retries here; keep checks predictable)
const http = axios.create({
  validateStatus: () => true // we handle status ourselves
});

export const checkMonitor = async (monitor) => {
  const start = Date.now();

  let status = "DOWN";
  let statusCode = null;
  let responseTime = null;
  let errorMessage = null;

  try {
    // ⚠️ Mongoose Map → plain object
    const headers =
      monitor.headers && typeof monitor.headers.entries === "function"
        ? Object.fromEntries(monitor.headers.entries())
        : monitor.headers || {};

    const req = {
      method: monitor.method || "GET",
      url: monitor.url,
      headers,
      timeout: monitor.timeout || 5000
    };

    if (req.method === "POST") {
      req.data = monitor.body || {};
    }

    const res = await http(req);

    responseTime = Date.now() - start;
    statusCode = res.status;

    // classification
    if (statusCode !== monitor.expectedStatus) {
      status = "DOWN";
    } else if (responseTime > DEGRADED_THRESHOLD_MS) {
      status = "DEGRADED";
    } else {
      status = "UP";
    }
  } catch (err) {
    responseTime = Date.now() - start;
    errorMessage = err.code || err.message || "REQUEST_FAILED";
    status = "DOWN";
  }

  // 🔥 1) persist log (source of truth)
  const log = await Log.create({
    monitorId: monitor._id,
    status,
    statusCode,
    responseTime,
    errorMessage
  });

  // 🔥 2) update snapshot (don’t block if this fails)
  await Monitor.findByIdAndUpdate(
    monitor._id,
    { status, lastChecked: new Date() },
    { lean: true }
  ).catch(() => {});

  // 🔥 3) incident logic (derived from logs)
  await incidentService.handleIncident(monitor._id).catch(() => {});

  // 🔥 4) realtime emit (best-effort)
  try {
    const io = getIO();
    io.emit("logUpdate", {
      monitorId: monitor._id,
      status,
      statusCode,
      responseTime,
      createdAt: log.createdAt
    });
  } catch (_) {
    // socket not ready → ignore
  }

  // return minimal info for manual triggers/tests
  return { status, statusCode, responseTime, errorMessage };
};