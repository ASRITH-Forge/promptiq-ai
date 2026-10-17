import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("MongoDB connected successfully");
        });
        mongoose.connection.on("error", (err) => {
            console.error("MongoDB connection error:", err.message);
        });

        const uri = process.env.MONGODB_URI;
        if (!uri) {
            console.error("MongoDB Error: MONGODB_URI is not defined in .env");
            return;
        }

        await mongoose.connect(uri, {
            dbName: "quickgpt",
            serverSelectionTimeoutMS: 5000,
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};

export default connectDB;