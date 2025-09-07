import { Request, Response, NextFunction } from "express";
import admin from "../../server/firebaseAdmin";

export const verifyFirebaseToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      status: 401,
      error: "NO_TOKEN",
      message: "Authorization header missing or malformed",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);

    // Attach user data for downstream handlers
    (req as any).user = {
      uid: decodedToken.uid,
    };

    next(); // ✅ Passes to the actual route handler
  } catch (error: any) {
    console.error("Token verification failed:", error);

    // Map Firebase error codes to HTTP responses
    switch (error.code) {
      case "auth/id-token-expired":
        return res.status(401).json({
          status: 401,
          error: "TOKEN_EXPIRED",
          message: "Your session has expired. Please log in again.",
        });

      case "auth/argument-error":
        return res.status(400).json({
          status: 400,
          error: "INVALID_TOKEN",
          message: "The provided token is invalid.",
        });

      case "auth/invalid-user-token":
        return res.status(401).json({
          status: 401,
          error: "INVALID_USER",
          message: "This token does not belong to a valid user.",
        });

      default:
        return res.status(500).json({
          status: 500,
          error: "SERVER_ERROR",
          message: "Failed to verify authentication token.",
        });
    }
  }
};
