import { connectDB } from "@/app/utils/connect";
import User from "../../model/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"



 const getToken = (id: string)=>{
    if(!process.env.JWT_SECRET_KEY) {
        throw new Error("JWT_SECRET_KEY is not defined");
    }

    const token = jwt.sign({id}, process.env.JWT_SECRET_KEY, {expiresIn: "30d"});
    return token;
}

export const POST = async (request: Request) => {

    const { firstname, lastname, email, password } = await request.json();

    try {
        await connectDB();

        if(!firstname || !lastname || !email || !password) {
            return Response.json({message: "All fields are required"});
        }

        const existingUser =  await User.findOne({email});

        if(existingUser) {
            return Response.json({message: "User already exists"}, {status: 400});
        }


        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            isAdmin: true
        });

        const token = getToken(newUser._id.toString());

        return Response.json({message: "Admin registered successfully", token , user: newUser}, {status: 201});

    } catch (error) {
        return Response.json({message: "Internal server error"}, {status: 500});
    }
}

