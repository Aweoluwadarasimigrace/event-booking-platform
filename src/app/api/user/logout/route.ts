import { NextRequest, NextResponse } from "next/server";


export const POST = async (_request: NextRequest) => {
  try {
    return NextResponse.json({ message: "Logged out successfully" }, {
      status: 200,
    });
  } catch (error: unknown) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
};