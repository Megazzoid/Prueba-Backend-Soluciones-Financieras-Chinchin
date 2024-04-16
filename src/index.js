import app from "./app.js";
import { sequelize } from "./database/database.js";
import initializeCurrencies from "./database/initializeCurriencies.js";

async function main() {
  try {
    // Autenticar y sincronizar la base de datos
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    // Sincroniza los modelos con la base de datos
    await sequelize.sync();

    // Inicializar los datos de monedas, incluyendo la moneda BS
    await initializeCurrencies();

    // Iniciar el servidor Express
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  } catch (error) {
    console.log('Unable to connect to the database:', error);
  }
}

main();
