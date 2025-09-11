// server.ts
import http from "http";
import app from "./app";
import { initSocket } from "./socket";
import config from "./config/config";

const server = http.createServer(app);

// Attach Socket.io
initSocket(server);

// Start listening
server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
