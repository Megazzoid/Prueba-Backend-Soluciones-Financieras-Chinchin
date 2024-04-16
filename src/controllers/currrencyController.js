import axios from 'axios';
import dotenv from 'dotenv';
import Currency from '../models/currency.js';

dotenv.config();

const fetchCurrencyData = async (req, res) => {
  let symbols = req.query.symbols || 'BTC,ETH,BNB,USDT,EUR';

  // Normaliza la entrada reemplazando "EURO" o "EUR" por "EURC"
  symbols = symbols.replace(/EURO|EUR/gi, 'EURC');
  
  // Maneja el caso especial donde podría incluirse 'BS'
  const includeBS = symbols.includes('BS');
  symbols = symbols.replace('BS', '');

  // Valida los símbolos contra una lista permitida
  const allowedSymbols = ['BTC', 'ETH', 'BNB', 'USDT', 'EURC', 'BS'];
  const inputSymbols = symbols.split(',').map(s => s.trim()).filter(s => s); // Divide y limpia la entrada

  // Verifica si todos los símbolos de entrada están dentro de la lista permitida
  const areSymbolsValid = inputSymbols.every(symbol => allowedSymbols.includes(symbol));
  if (!areSymbolsValid) {
    return res.status(400).send('Moneda no soportada ingresada. Por favor ingrese una moneda correcta (USDT, EUR, BTC, BNB, ETH, BS)');
  }

  try {
    // Realiza llamadas a la API solo si hay símbolos distintos de 'BS'
    if (symbols.replace(/,+/g, '').trim()) {
      const cryptoResponse = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest', {
        params: {
          symbol: symbols,
          convert: 'USD'
        },
        headers: {
          'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY
        }
      });

      // Prepara la respuesta de la API
      const apiData = cryptoResponse.data.data;
      const rates = {};
      for (let [key, value] of Object.entries(apiData)) {
        rates[key] = value.quote.USD.price;
      }

      // Incluye el tipo de cambio para "BS" si se solicitó
      if (includeBS) {
        const bsCurrency = await Currency.findOne({ where: { symbol: 'BS' } });
        if (bsCurrency) {
          rates['BS'] = bsCurrency.rateToUSD;
        }
      }

      res.json(rates);
    } else if (includeBS) {
      // Solo se solicitó 'BS', búscalo en la base de datos
      const bsCurrency = await Currency.findOne({ where: { symbol: 'BS' } });
      if (bsCurrency) {
        res.json({ 'BS': bsCurrency.rateToUSD });
      } else {
        res.status(404).send('Moneda BS no encontrada');
      }
    } else {
      // No se proporcionaron símbolos válidos
      res.status(400).send('No se proporcionaron símbolos válidos');
    }
  } catch (error) {
    console.error('Error al obtener datos de moneda:', error);
    res.status(500).send('Error al obtener datos de moneda');
  }
};

export { fetchCurrencyData };
