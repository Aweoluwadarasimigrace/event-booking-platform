import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "../api/model/user.model";

export const verifyToken = async (req: NextRequest) => {
  const token = req.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as {
      id: string;
    };

    const user = await User.findById(decoded.id).select("-password");
    if(!user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
   
    return user;
  } catch (error) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
};
