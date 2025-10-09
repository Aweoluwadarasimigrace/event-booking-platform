import { connectDB } from "@/app/utils/connect";
import User from "../../model/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



const getToken = (id: string)=>{
    if(!process.env.JWT_SECRET_KEY) {
        throw new Error("JWT_SECRET_KEY is not defined");
    }

    const token = jwt.sign({id}, process.env.JWT_SECRET_KEY, {expiresIn: "30d"});
    return token;
}
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

        if(error instanceof Error){
            return Response.json({message: error.message}, {status: 500});
        }else{  
        return Response.json({message: "Internal server error"}, {status: 500});
    }
}
};