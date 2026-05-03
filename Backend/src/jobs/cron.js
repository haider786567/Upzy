import cron from "node-cron";
import monitorModel from "../models/monitor.model.js";
import { checkMonitor } from "../services/monitorService.js";
import { computeHourlyAnalytics } from "../services/analyticsService.js";

let isMonitoringRunning = false;
let isAnalyticsRunning = false;

const startCron = () => {

  // 🔥 SMART MONITOR SCHEDULER
  cron.schedule("*/15 * * * * *", async () => {
    if (isMonitoringRunning) return;

    isMonitoringRunning = true;

    try {
      const now = new Date();

      // 🔥 ONLY FETCH DUE MONITORS
      const monitors = await monitorModel.find({
        isActive: true,
        nextRunAt: { $lte: now }
      });

      const batchSize = 10;

      for (let i = 0; i < monitors.length; i += batchSize) {
        const batch = monitors.slice(i, i + batchSize);

        await Promise.allSettled(
          batch.map(async (monitor) => {
            await checkMonitor(monitor);

            // 🔥 FIXED SCHEDULING (NO DRIFT)
            monitor.nextRunAt = new Date(
              monitor.nextRunAt.getTime() + monitor.interval * 1000
            );

            await monitor.save();
          })
        );
      }

    } catch (err) {
      console.error("Monitor cron error:", err.message);
    } finally {
      isMonitoringRunning = false;
    }
  });

  // 🔥 ANALYTICS
  cron.schedule("0 * * * *", async () => {
    if (isAnalyticsRunning) return;

    isAnalyticsRunning = true;

    try {
      await computeHourlyAnalytics();
    } catch (err) {
      console.error("Analytics cron error:", err.message);
    } finally {
      isAnalyticsRunning = false;
    }
  });
};

export default startCron;