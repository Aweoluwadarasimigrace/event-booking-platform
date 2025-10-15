import { NextRequest, NextResponse } from "next/server";


export const POST = async (request: NextRequest) => {
  try {
    return NextResponse.json({ message: "Logged out successfully" }, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
};