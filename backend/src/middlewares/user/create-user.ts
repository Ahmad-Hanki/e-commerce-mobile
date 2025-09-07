import { Request, Response } from "express";
import { prisma } from "../../config/prisma";

export const createUser = async (req: Request, res: Response) => {
  const { email, name, firebaseUid } = await req.body; 

  if (!email || !name || !firebaseUid) {
    return res.status(400).json({ message: "Bad request" });
  }

  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        firebaseUid,
      },
    });

    if (newUser) {
      return res.status(201).json({ message: "User created", user: newUser });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
