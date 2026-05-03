import dotenv from 'dotenv';

dotenv.config();
if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined in the environment variables');

}
if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
}

if (!process.env.GEMNI_API_KEY) {
    throw new Error('GEMNI_API_KEY is not defined in the environment variables');
}

// 🔥 2. Initialize model and parser

const config = {
    MONGO_URI: process.env.MONGO_URI ,
    PORT: process.env.PORT || 3001,
    NODE_ENV: process.env.NODE_ENV ,
    EMAIL: process.env.EMAIL,
    EMAIL_PASS: process.env.EMAIL_PASS,
    JWT_SECRET: process.env.JWT_SECRET,
    GEMNI_API_KEY: process.env.GEMNI_API_KEY
};
export default config;