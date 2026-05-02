import dotenv from 'dotenv';

dotenv.config();
if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined in the environment variables');
}

const config = {
    MONGO_URI: process.env.MONGO_URI ,
    PORT: process.env.PORT || 3001,
    NODE_ENV: process.env.NODE_ENV ,
    EMAIL: process.env.EMAIL,
    EMAIL_PASS: process.env.EMAIL_PASS,
    JWT_SECRET: process.env.JWT_SECRET
};
export default config;