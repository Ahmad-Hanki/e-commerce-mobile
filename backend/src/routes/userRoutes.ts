import { Router } from "express";
import { createUser } from "../middlewares/user/create-user";
import { getUser } from "../middlewares/user/get-user";
import { verifyFirebaseToken } from "../middlewares/auth/authMiddleware";
const userRoutes = Router();

userRoutes.post("/user", createUser);
userRoutes.get("/user", verifyFirebaseToken, getUser);

export default userRoutes;
