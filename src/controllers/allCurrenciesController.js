import axios from 'axios';
import dotenv from 'dotenv';
import Currency from '../models/currency.js';

dotenv.config();

const fetchAllCurrenciesData = async (req, res) => {
  // Definir las monedas cripto que queremos obtener de CoinMarketCap
  let cryptoSymbols = 'BTC,ETH,BNB,USDT,EURC'; // Usamos 'EURC' para obtener el precio

  // Si la solicitud incluye "EUR" o "EURO", asegurarnos de que se convierta a "EURC"
  if (req.query.symbols) {
    let symbols = req.query.symbols.toUpperCase();
    symbols = symbols.replace(/EURO|EUR/gi, 'EURC');
    cryptoSymbols = symbols; // Actualiza los símbolos de la solicitud con la cadena modificada
  }

  try {
    // Hacer la llamada a la API de CoinMarketCap para las criptomonedas
    const cryptoResponse = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest', {
      params: {
        symbol: cryptoSymbols,
        convert: 'USD'
      },
      headers: {
        'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY
      }
    });

    // Extraer los datos de criptomonedas de la respuesta de la API
    const apiData = cryptoResponse.data.data;
    const rates = {};
    for (let [key, value] of Object.entries(apiData)) {
      // Convertir "EURC" de nuevo a "EUR" para la respuesta si es necesario
      if (key === 'EURC') {
        rates['EUR'] = value.quote.USD.price;
      } else {
        rates[key] = value.quote.USD.price;
      }
    }

    // Buscar la tasa de cambio para "BS" en la base de datos local
    const bsCurrency = await Currency.findOne({ where: { symbol: 'BS' } });
    if (bsCurrency) {
      rates['BS'] = bsCurrency.rateToUSD;
    } else {
      rates['BS'] = 100000; // Valor por defecto si no se encuentra
    }

    res.json(rates);
  } catch (error) {
    console.error('Error fetching all currency data:', error);
    res.status(500).send('Error fetching all currency data');
  }
};

export { fetchAllCurrenciesData };
