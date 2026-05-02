import http from "http";
import app from "./src/app.js";
import config from "./src/config/config.js";
import connectDB from "./src/config/db.js";
import { initSocket } from "./src/socket/socket.js";
import startCron from "./src/jobs/cron.js";

// Connect DB
connectDB();

// 🔥 Create HTTP server
const server = http.createServer(app);

// 🔥 Attach socket
initSocket(server);

// Start cron jobs
startCron();

// Start server
server.listen(config.PORT, () => {
  console.log(`🚀 Server running on port ${config.PORT}`);
});