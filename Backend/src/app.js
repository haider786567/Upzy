import express from 'express';
import monitorRoutes from './routes/monitorRoutes.js';
import logRoutes from './routes/logRoutes.js';
import incidentRoutes from "./routes/incidentRoutes.js";
import errorHandler from './middlewares/errormiddleware.js';

const app = express();

app.use(express.json());
app.use('/api/monitor', monitorRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/incidents', incidentRoutes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.use(errorHandler);

export default app;