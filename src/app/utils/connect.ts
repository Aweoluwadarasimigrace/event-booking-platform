import mongoose from "mongoose";

const mongodb = process.env.MONGODB_URI;
export const connectDB = async () => {
  if (!mongodb) throw new Error("MongoDB URI is not defined");

  try {
    const connection = await mongoose.connect(mongodb);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`);
  }
};
