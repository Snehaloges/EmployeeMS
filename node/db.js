import mongoose from "mongoose";

const MONGO_URL = "mongodb://localhost:27017/EmployeeMS";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Error:", err);
  }
};

export default connectDB;
