import { Request, Response } from "express";
import { prisma } from "../../config/prisma";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json({ data: categories });
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve categories" });
  }
};
