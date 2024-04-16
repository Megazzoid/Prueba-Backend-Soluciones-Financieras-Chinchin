import Currency from "../models/currency.js";


async function initializeCurrencies() {
  try {
    // Verifica si la moneda BS ya existe en la base de datos
    const existingCurrency = await Currency.findOne({ where: { symbol: 'BS' } });
if (!existingCurrency) {
  // Si no existe, crea la moneda BS
  await Currency.create({
    name: 'Bolívar',
    symbol: 'BS',
    rateToUSD: 0.00001 // Supone que 100.000 BS = 1 USD
  });
  console.log('BS currency initialized.');
}

  } catch (error) {
    console.error('Error initializing currencies:', error);
  }
}

export default initializeCurrencies;
