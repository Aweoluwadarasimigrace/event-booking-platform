import { connectDB } from "@/app/utils/connect";
import User from "../../model/user.model";
import bcrypt from "bcryptjs";
import { getToken } from "../register/route";


export const POST = async (req: Request)=>{

    const {email, password} = await req.json();
    try {
        await connectDB();
        //perform login operation

        if(!email || !password){
            return Response.json({message: "All fields are required"});
        }

        const user = await User.findOne({email});

        if(!user){
            return Response.json({message: "Invalid credentials"}, {status: 400});
        }


        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return Response.json({message: "Invalid credentials"}, {status: 400});
        }

        const id = user._id.toString();

        const token = getToken(id);

        return Response.json({message: "Admin logged in successfully", token, user}, {status: 200});
    } catch (error) {
        return Response.json({message: "Internal server error"}, {status: 500});
    }
};