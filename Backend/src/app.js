import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import monitorRoutes from './routes/monitorRoutes.js';
import logRoutes from './routes/logRoutes.js';
import incidentRoutes from "./routes/incidentRoutes.js";
import errorHandler from './middlewares/errormiddleware.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { securityHeaders } from './utils/security.js';
import config from './config/config.js';
// import { globalLimiter } from './middlewares/ratelimiter.js';

const app = express();

app.use(securityHeaders);

app.use(morgan('dev'));
// app.use(globalLimiter); // Apply global rate limiter to all routes
app.use(cors({ origin: config.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/monitor', monitorRoutes);
app.use('/logs', logRoutes);
app.use('/incidents', incidentRoutes);
app.use('/auth', authRoutes);
app.use('/analytics', analyticsRoutes);
app.use('/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.use(errorHandler);


export default app;