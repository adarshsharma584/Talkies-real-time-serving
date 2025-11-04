import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/chatApp");
        
        console.log(`MongoDB connected successfully: ${conn.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1); // Exit the process with failure
    }
}