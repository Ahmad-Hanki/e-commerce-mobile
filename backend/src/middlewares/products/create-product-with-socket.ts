import type { Server, Socket } from "socket.io";
import { prisma } from "../../config/prisma";

export function LiveProductHandler(io: Server, socket: Socket) {
  console.log("A user connected", socket.id);

  let currentRoom: string | null = null;

  socket.on("joinRoom", (room: string) => {
    socket.join(room);
    currentRoom = room;
    console.log(socket.id, "joined", room);

    // Send all products when joining
    sendAllProducts();
  });

  // Function to fetch and emit all products
  const sendAllProducts = async () => {
    try {
      const saved = await prisma.product.findMany();
      if (currentRoom) {
        io.to(currentRoom).emit("products", saved);
      } else {
        io.emit("products", saved);
      }
    } catch (err) {
      console.error("Failed to fetch products", err);
      socket.emit("error", { message: "Failed to fetch products" });
    }
  };

  // Listen for a request to refresh products
  socket.on("getProducts", sendAllProducts);

  // Listen for new product
  socket.on("product", async (productData) => {
    try {
      const newProduct = await prisma.product.create({ data: productData });
      if (currentRoom) {
        io.to(currentRoom).emit("product", newProduct); // live push
      }
    } catch (err) {
      console.error("Failed to create product", err);
      socket.emit("error", { message: "Failed to create product" });
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
}
