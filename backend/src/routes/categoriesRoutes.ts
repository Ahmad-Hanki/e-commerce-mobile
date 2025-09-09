import { Router } from "express";
import { getCategories } from "../middlewares/categories/get-categories";

const categoriesRoutes = Router();

categoriesRoutes.get("/categories", getCategories);

export default categoriesRoutes;
