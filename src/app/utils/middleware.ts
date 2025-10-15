import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import User from "../api/model/user.model";

export const verifyToken = async (req: NextRequest) => {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) throw new Error("No authorization header");

    const token = authHeader.split(" ")[1];
    if (!token) throw new Error("No token provided");

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as { id: string };
    if (!decoded?.id) throw new Error("Invalid token payload");

    const user = await User.findById(decoded.id).select("-password");
    if (!user) throw new Error("User not found");

    return user.toObject();
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ Token verification failed:", error.message);
    }
    throw new Error("Unauthorized");
  }
};
