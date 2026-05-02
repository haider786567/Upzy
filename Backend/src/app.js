import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import monitorRoutes from './routes/monitorRoutes.js';
import logRoutes from './routes/logRoutes.js';
import incidentRoutes from "./routes/incidentRoutes.js";
import errorHandler from './middlewares/errormiddleware.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/auth', authRoutes);
app.use('/api/monitor', monitorRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/incidents', incidentRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.use(errorHandler);


export default app;