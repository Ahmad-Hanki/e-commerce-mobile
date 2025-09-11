import express from "express";
import { errorHandler } from "./middlewares/errorHandler";
import userRoutes from "./routes/userRoutes";
import categoriesRoutes from "./routes/categoriesRoutes";

const app = express();

app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", categoriesRoutes);

app.use(errorHandler);



export default app;
