import cron from "node-cron";
import monitorModel from "../models/monitor.model.js";
import { checkMonitor } from "../services/monitorService.js";
import { computeHourlyAnalytics } from "../services/analyticsService.js";

let isMonitoringRunning = false;
let isAnalyticsRunning = false;

const startCron = () => {

  // 🔥 MONITOR CHECK (every 15 sec)
  cron.schedule("*/15 * * * * *", async () => {
    if (isMonitoringRunning) {
      console.log("⚠️ Skipping overlapping monitor run");
      return;
    }

    isMonitoringRunning = true;
    console.log("⏱ Running monitor checks...");

    try {
      const monitors = await monitorModel.find({ isActive: true });

      // 🔥 LIMIT CONCURRENCY (important)
      const batchSize = 10;

      for (let i = 0; i < monitors.length; i += batchSize) {
        const batch = monitors.slice(i, i + batchSize);

        await Promise.allSettled(
          batch.map((monitor) => checkMonitor(monitor))
        );
      }

    } catch (err) {
      console.error("Monitor cron error:", err.message);
    } finally {
      isMonitoringRunning = false;
    }
  });

  // 🔥 ANALYTICS (every hour)
  cron.schedule("0 * * * *", async () => {
    if (isAnalyticsRunning) {
      console.log("⚠️ Skipping overlapping analytics run");
      return;
    }

    isAnalyticsRunning = true;
    console.log("📊 Running hourly analytics...");

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