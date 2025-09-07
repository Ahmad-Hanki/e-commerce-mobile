import { Request, Response } from "express";
import { prisma } from "../../config/prisma";

export const getUser = async (req: Request, res: Response) => {
  const { user } = req as any;
  const { uid } = user;

  if (!uid) {
    return res.status(404).json({ message: "Not found" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        firebaseUid: uid,
      },
    });
    if (user) {
      return res.status(200).json({ message: "User found", user });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
