import Log from "../models/log.model.js";
import Analytics from "../models/analytics.model.js";
import mongoose from "mongoose";

export const computeHourlyAnalytics = async () => {
  const now = new Date();
  const oneHourAgo = new Date(now - 60 * 60 * 1000);

  const data = await Log.aggregate([
    {
      $match: {
        createdAt: { $gte: oneHourAgo }
      }
    },
    {
      $group: {
        _id: {
          monitorId: "$monitorId",
          hour: { $hour: "$createdAt" },
          day: { $dayOfMonth: "$createdAt" },
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" }
        },
        total: { $sum: 1 },
        down: {
          $sum: {
            $cond: [{ $eq: ["$status", "DOWN"] }, 1, 0]
          }
        },
        avgResponse: { $avg: "$responseTime" }
      }
    }
  ]);

  for (const item of data) {
    const uptime = item.total
      ? ((item.total - item.down) / item.total) * 100
      : 0;

    await Analytics.findOneAndUpdate(
      {
        monitorId: item._id.monitorId,
        date: new Date(
          item._id.year,
          item._id.month - 1,
          item._id.day,
          item._id.hour
        )
      },
      {
        monitorId: item._id.monitorId,
        date: new Date(
          item._id.year,
          item._id.month - 1,
          item._id.day,
          item._id.hour
        ),
        uptime,
        errorRate: item.total ? (item.down / item.total) * 100 : 0,
        avgResponseTime: item.avgResponse,
        totalRequests: item.total,
        downCount: item.down
      },
      { upsert: true }
    );
  }
};