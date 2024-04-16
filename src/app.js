import express from 'express';
import currencyRoutes from './routes/currencyRoutes.js';
import allCurrencyRoutes from './routes/allCurrencyRoutes.js';


const app = express();

app.use(express.json()); // Middleware para parsear el cuerpo de las peticiones JSON
app.use('/api', currencyRoutes);
app.use('/api', allCurrencyRoutes);

export default app;
