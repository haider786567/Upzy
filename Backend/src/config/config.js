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
if (!process.env.REDIS_HOST) {
    throw new Error('REDIS_HOST is not defined in the environment variables');
}
if (!process.env.REDIS_PORT) {
    throw new Error('REDIS_PORT is not defined in the environment variables');
}
if (!process.env.REDIS_PASSWORD) {
    throw new Error('REDIS_PASSWORD is not defined in the environment variables');
}

// 🔥 2. Initialize model and parser

const config = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT || 3001,
    NODE_ENV: process.env.NODE_ENV,
    EMAIL: process.env.EMAIL,
    EMAIL_PASS: process.env.EMAIL_PASS,
    JWT_SECRET: process.env.JWT_SECRET,
    GEMNI_API_KEY: process.env.GEMNI_API_KEY,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    CLIENT_URL: process.env.CLIENT_URL
};
export default config;