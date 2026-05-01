import express from 'express';
import monitorRoutes from './routes/monitorRoutes.js';
import errorHandler from './middlewares/errormiddleware.js';

const app = express();

app.use(express.json());
app.use('/api/monitor', monitorRoutes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.use(errorHandler);

export default app;