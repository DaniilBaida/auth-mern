import { connect } from "mongoose";
import { DB_URI } from "./env.js";

export const connectDB = async () => {
    try {
        await connect(DB_URI);
        console.log(`MongoDB Connected`);
    } catch (error) {
        console.log(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};
