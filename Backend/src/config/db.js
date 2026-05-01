<<<<<<< HEAD
import dotenv from "dotenv";
dotenv.config();

import mongoose from 'mongoose';

const connectDB = async () => {
    
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
};
=======
import mongoose from 'mongoose';
import config from './config.js';

const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URI, {
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit process with failure
    }
};

>>>>>>> 54a6cc82a5fd3591749f96c5f5bf1e15dd95dbdc
export default connectDB;