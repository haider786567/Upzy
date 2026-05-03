import Analytics from "../models/analytics.model.js";
import Incident from "../models/incident.model.js";
import mongoose from "mongoose";

export const getAnalytics = async (req, res, next) => {
  try {
    const { monitorId } = req.params;
    const { range = "24h" } = req.query;

    const objectId = new mongoose.Types.ObjectId(monitorId);

    let startDate;

    if (range === "24h") {
      startDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
    } else if (range === "7d") {
      startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    } else {
      startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    }

    const analytics = await Analytics.find({
      monitorId: objectId,
      date: { $gte: startDate }
    }).sort({ date: 1 });

    // aggregate from precomputed data
    let total = 0;
    let totalDown = 0;
    let totalLatency = 0;

    analytics.forEach(a => {
      total += a.totalRequests;
      totalDown += a.downCount;
      totalLatency += a.avgResponseTime * a.totalRequests;
    });

    const uptime = total ? ((total - totalDown) / total) * 100 : 0;
    const errorRate = total ? (totalDown / total) * 100 : 0;
    const avgResponseTime = total ? totalLatency / total : 0;

    // 🔥 downtime (still real-time from incidents)
    const incidents = await Incident.find({ monitorId: objectId });

    let totalDowntime = 0;

    incidents.forEach(i => {
      if (i.endTime) {
        totalDowntime += (i.endTime - i.startTime);
      } else {
        totalDowntime += (Date.now() - i.startTime);
      }
    });

    res.json({
      uptime: uptime.toFixed(2),
      errorRate: errorRate.toFixed(2),
      avgResponseTime: avgResponseTime.toFixed(2),
      totalDowntimeMinutes: Math.round(totalDowntime / (1000 * 60)),
      graph: analytics
    });

  } catch (err) {
    next(err);
  }
};