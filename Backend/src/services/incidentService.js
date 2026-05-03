import Log from "../models/log.model.js";
import Incident from "../models/incident.model.js";
import Monitor from "../models/monitor.model.js";
import { getIO } from "../socket/socket.js";
import { generateSummary } from "./aiService.js";
import { notifyIncidentCreated, notifyIncidentResolved } from "./alertService.js";

// tune these once
const WINDOW = 3;              // logs to inspect
const DOWN_THRESHOLD = 3;      // 3 DOWNs → incident
const DEGRADED_THRESHOLD = 3; // 3 DEGRADEDs → incident

const getRecentLogs = async (monitorId, limit = WINDOW) => {
  return Log.find({ monitorId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
};

export const handleIncident = async (monitorId) => {
  try {
    const logs = await getRecentLogs(monitorId, WINDOW);
    if (logs.length < WINDOW) return; // not enough signal

    const allDown = logs.every(l => l.status === "DOWN");
    const allDegraded = logs.every(l => l.status === "DEGRADED");

    // active incident (fast path; ensure index on {monitorId, resolved})
    const active = await Incident.findOne({
      monitorId,
      resolved: false
    });

    // 🔴 CREATE
    if (!active && (allDown || allDegraded)) {
      const type = allDown ? "DOWN" : "DEGRADED";

      const incident = await Incident.create({
        monitorId,
        type,
        startTime: logs[logs.length - 1].createdAt, // first failure in window
        resolved: false,
      });
      console.log(incident);
      

      // fire-and-forget AI (don’t block)
      generateAISummary(monitorId, incident._id).catch(() => { });
      notifyIncidentCreated({ monitorId, type, startTime: incident.startTime  }).catch(() => { });

      // realtime notify (best-effort)
      try {
        const io = getIO();
        io.emit("incidentUpdate", {
          monitorId,
          type,
          resolved: false,
          startTime: incident.startTime
        });
      } catch (_) { }

      return;
    }

    // 🟢 RESOLVE
    // if we have an active incident and the latest log is healthy
    if (active) {
      const latest = logs[0];

      const recovered =
        latest.status === "UP" ||
        (latest.status === "DEGRADED" && active.type === "DOWN"); // partial recovery for DOWN

      if (recovered) {
        const updated = await Incident.findByIdAndUpdate(
          active._id,
          { endTime: new Date(), resolved: true },
          { new: true }
        );

        // fire-and-forget email alert
        notifyIncidentResolved({ monitorId, type: updated.type, startTime: active.startTime, endTime: updated.endTime }).catch(() => { });

        try {
          const io = getIO();
          io.emit("incidentUpdate", {
            monitorId,
            type: updated.type,
            resolved: true,
            endTime: updated.endTime
          });
        } catch (_) { }
      }
    }
  } catch (err) {
    console.error("incidentService error:", err.message);
  }
};

// ---- AI (async, non-blocking) ----

async function generateAISummary(monitorId, incidentId) {
  // keep payload small but informative
  const recentLogs = await Log.find({ monitorId })
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  const previousLogs = await Log.find({ monitorId })
    .sort({ createdAt: -1 })
    .skip(5)
    .limit(5)
    .lean();

  const monitor = await Monitor.findById(monitorId).lean();

  const ai = await generateSummary({
    url: monitor?.url,
    method: monitor?.method,
    recentLogs,
    previousLogs
  });

  // expect structured output { summary, rootCause, suggestion }
  await Incident.findByIdAndUpdate(incidentId, { ai });
}