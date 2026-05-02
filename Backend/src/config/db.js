import config from "./config.js";
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.MONGO_URI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        throw error;
    }
};
export default connectDB;