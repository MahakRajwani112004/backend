import mongoose from "mongoose";
import { env } from "./env.config";

const MONGO_URL = env.db.MONGO_URI || "mongodb://localhost:27017/chatdb";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};

export default connectDB;
