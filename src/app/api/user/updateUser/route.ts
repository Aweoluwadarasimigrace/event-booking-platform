import { connectDB } from "@/app/utils/connect";
import { verifyToken } from "@/app/utils/middleware";
import { NextRequest, NextResponse } from "next/server";
import User from "../../model/user.model";

type UserToUpdateType = {
  firstname?: string;
  lastname?: string;
  email?: string;
};

export const PATCH = async (req: NextRequest) => {
  try {
    await connectDB();
    const user = await verifyToken(req);
    const { firstname, lastname, email }: UserToUpdateType = await req.json();

    const userToUpdate: UserToUpdateType = {};
    if (firstname) userToUpdate.firstname = firstname;
    if (lastname) userToUpdate.lastname = lastname;
    if (email) userToUpdate.email = email;

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { ...userToUpdate }, // <-- spread here
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unauthorized";
    return NextResponse.json({ message }, { status: 401 });
  }
};
