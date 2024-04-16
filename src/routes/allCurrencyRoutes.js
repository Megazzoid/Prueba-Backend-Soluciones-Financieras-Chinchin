import express from 'express';
import { fetchAllCurrenciesData } from '../controllers/allCurrenciesController.js';

const router = express.Router();

// Ruta para obtener las tasas de todas las monedas
router.get('/all-currencies', fetchAllCurrenciesData);

export default router;
