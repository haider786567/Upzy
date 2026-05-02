import http from "http";
import app from "./src/app.js";
import config from "./src/config/config.js";
import connectDB from "./src/config/db.js";
import { initSocket } from "./src/socket/socket.js";

// Connect DB
connectDB();

// 🔥 Create HTTP server
const server = http.createServer(app);

// 🔥 Attach socket
initSocket(server);

// Start server
server.listen(config.PORT, () => {
  console.log(`🚀 Server running on port ${config.PORT}`);
});