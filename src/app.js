import express from 'express';
import currencyRoutes from './routes/currencyRoutes.js';

const app = express();

app.use(express.json()); // Middleware para parsear el cuerpo de las peticiones JSON
app.use('/api', currencyRoutes);

export default app;
