import cron from "node-cron";
import monitorModel from "../models/monitor.model.js";
import { checkMonitor } from "../services/monitorService.js";

const startCron = () => {
  // ⏱ every 15 seconds
  cron.schedule("*/15 * * * * *", async () => {
    console.log("⏱ Running monitor checks...");

    try {
      const monitors = await monitorModel.find({ isActive: true });

      if (!monitors.length) return;

      // 🔥 run in parallel (important)
      await Promise.allSettled(
        monitors.map((monitor) => checkMonitor(monitor))
      );

    } catch (err) {
      console.error("Cron error:", err.message);
    }
  });
};

export default startCron;