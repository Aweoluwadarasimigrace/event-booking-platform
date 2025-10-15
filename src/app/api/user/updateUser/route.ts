import { connectDB } from "@/app/utils/connect";
import { verifyToken } from "@/app/utils/middleware";
import { NextRequest, NextResponse } from "next/server";
import User from "../../model/user.model";


export const PATCH = async (req: NextRequest) => {
  try {

    await connectDB();
    const user = await verifyToken(req);
    const { firstname, lastname, email} = await req.json();


    const usertoUpdate: any = {}

    if(firstname){
      usertoUpdate.firstname = firstname
    }
    if(lastname){
      usertoUpdate.lastname = lastname
    }
    if(email){
      usertoUpdate.email = email
    }

   const updateUser = await User.findByIdAndUpdate(user._id, {
    usertoUpdate
   }, {new: true}).select("-password");

   if(!updateUser) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
   }
   return NextResponse.json({ user: updateUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
};