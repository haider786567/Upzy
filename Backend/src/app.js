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
// import { globalLimiter } from './middlewares/ratelimiter.js';

const app = express();



app.use(morgan('dev'));
// app.use(globalLimiter); // Apply global rate limiter to all routes
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/api/monitor', monitorRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/incidents', incidentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/analytics', analyticsRoutes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.use(errorHandler);


export default app;