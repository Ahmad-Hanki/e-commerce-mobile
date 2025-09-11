import { Server } from "socket.io";
import { LiveProductHandler } from "../middlewares/products/create-product-with-socket";

export function initSocket(server: any) {
  const io = new Server(server, {
    cors: {
      origin: "*", // restrict in production
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    // Attach product socket events
    LiveProductHandler(io, socket);

    // You could attach more handlers here, e.g.
    // ChatHandler(io, socket);
    // NotificationHandler(io, socket);
  });

  return io;
}
