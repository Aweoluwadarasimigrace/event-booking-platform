import { connectDB } from "@/app/utils/connect";
import { verifyToken } from "@/app/utils/middleware";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req: NextRequest)=>{
    try {
        await connectDB();
        const user = await verifyToken(req);
        return NextResponse.json({ user }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
}