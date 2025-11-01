import Event from "@/app/api/model/event.model";
import { uploadToCloudinary } from "@/app/utils/cloudinary";
import { connectDB } from "@/app/utils/connect";
import { verifyToken } from "@/app/utils/middleware";
import { NextRequest, NextResponse } from "next/server";



export const PATCH = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectDB();
    const user = await verifyToken(request);

    const { id } = params;
    let uploadedImageUrl = "";

    // ✅ Extract image file
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const result = await uploadToCloudinary(buffer) as { secure_url: string };
      uploadedImageUrl = result.secure_url;
    } else {
      return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
    }

    // ✅ Update event image (ensure ownership)
    const event = await Event.findOneAndUpdate(
      { _id: id, createdBy: user._id },
      { image: uploadedImageUrl },
      { new: true }
    );

    if (!event) {
      return NextResponse.json({ message: "Event not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Image updated successfully", event },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("Error updating image:", error);
    return NextResponse.json({ message: "Error updating image" }, { status: 500 });
  }
};
