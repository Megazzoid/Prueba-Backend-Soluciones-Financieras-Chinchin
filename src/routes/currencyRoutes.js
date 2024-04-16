import express from 'express';
import { fetchCurrencyData } from '../controllers/currrencyController.js';

const router = express.Router();

router.get('/currencies', fetchCurrencyData);

export default router;
