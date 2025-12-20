import Event from "@/app/api/model/event.model";
import { uploadToCloudinary } from "@/app/utils/cloudinary";
import { connectDB } from "@/app/utils/connect";
import { verifyToken } from "@/app/utils/middleware";
import { ParamType } from "@/type";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  request: NextRequest,
  { params }: ParamType
) => {
  try {
    await connectDB();

    const user = await verifyToken(request);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { message: "Invalid or missing file" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await uploadToCloudinary(buffer);

    if (!result.secure_url) {
      throw new Error("Cloudinary upload failed");
    }

    const event = await Event.findOneAndUpdate(
      { _id: id, createdBy: user._id },
      { image: result.secure_url },
      { new: true }
    );

    if (!event) {
      return NextResponse.json(
        { message: "Event not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Image updated successfully",
      event,
    });
  } catch (error: any) {
    console.error("PATCH /updateImage error:", error);

    return NextResponse.json(
      { message: "Error updating image", error: error.message },
      { status: 500 }
    );
  }
};
