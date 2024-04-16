import axios from 'axios';
import dotenv from 'dotenv';
import Currency from '../models/currency.js';

dotenv.config();

const fetchCurrencyData = async (req, res) => {
  let symbols = req.query.symbols || 'BTC,ETH,BNB,USDT,EUR';

  // Reemplazar "EURO" o "EUR" por "EURC" en la lista de símbolos para buscar el euro a traves de EURC (Mismo precio que EUR)
  symbols = symbols.replace(/EURO|EUR/gi, 'EURC');

  
  const includeBS = symbols.includes('BS');
  symbols = symbols.replace('BS', ''); 

  try {
    // Hacer llamadas API solo si hay símbolos distintos de 'BS'
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

      // Preparar la respuesta de la API
      const apiData = cryptoResponse.data.data;
      const rates = {};
      for (let [key, value] of Object.entries(apiData)) {
        rates[key] = value.quote.USD.price;
      }

      // Incluir la tasa de cambio de "BS" si fue solicitada
      if (includeBS) {
        const bsCurrency = await Currency.findOne({ where: { symbol: 'BS' } });
        if (bsCurrency) {
          rates['BS'] = bsCurrency.rateToUSD;
        }
      }

      res.json(rates);
    } else if (includeBS) {
      // Solo se solicitó "BS", obtenerlo de la base de datos
      const bsCurrency = await Currency.findOne({ where: { symbol: 'BS' } });
      if (bsCurrency) {
        res.json({ 'BS': bsCurrency.rateToUSD });
      } else {
        res.status(404).send('BS currency not found');
      }
    } else {
      // No se solicitaron símbolos válidos
      res.status(400).send('No valid symbols provided');
    }
  } catch (error) {
    console.error('Error fetching currency data:', error);
    res.status(500).send('Error fetching currency data');
  }
};

export { fetchCurrencyData };
