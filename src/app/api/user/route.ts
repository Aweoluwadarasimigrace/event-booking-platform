import { connectDB } from "@/app/utils/connect";
import { verifyToken } from "@/app/utils/middleware";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req: NextRequest)=>{
    await connectDB();
    try {
        const user = await verifyToken(req);
        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
}