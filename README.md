# Documentación de API de intercambio con tasas en diferentes monedas,

Este proyecto proporciona una API para consultar información sobre diversas monedas y realizar conversiones entre ellas utilizando Node.js, Express y Sequelize con PostgreSQL.

## Configuración Inicial

### Pre-requisitos

Necesitarás tener Node.js y PostgreSQL instalados en tu máquina local. También necesitas acceso a un editor de código y una terminal para ejecutar comandos.

### Configuración de la base de datos

1. **Configura PostgreSQL**: Asegúrate de tener PostgreSQL instalado y ejecutándose en tu máquina.
2. **Clona el repositorio**: Obtén el código fuente desde el repositorio de GitHub clonando el repositorio a tu máquina local.
3. **Archivo .env**: Deberás modificar el archivo `.env` en la raíz del proyecto con las siguientes variables para conectar con tu base de datos PostgreSQL:

    ```plaintext
    DB_NAME="nombre_de_tu_base_de_datos"
    DB_USER="tu_usuario"
    DB_PASSWORD="tu_contraseña"
    DB_HOST="localhost"
    ```

    Asegúrate de remplazar `nombre_de_tu_base_de_datos`, `tu_usuario`, y `tu_contraseña` con tus propios detalles de conexión a la base de datos.

### Instalación de Dependencias

Ejecuta `npm install` para instalar todas las dependencias necesarias para el proyecto.

### Ejecutar la Aplicación

Utiliza `npm start` para iniciar el servidor. El servidor se ejecutará en `http://localhost:3000`.

## Uso de la API

La API soporta los siguientes endpoints:

### Obtener Información de Una Moneda Específica

- **URL**: `http://localhost:3000/api/currencies?symbols={SYM}`
- **Método**: `GET`
- **Parámetro URL**:
- `symbols`: Símbolo o símbolos de las monedas que deseas consultar, separados por comas (por ejemplo, `BTC,ETH`). Reemplaza `{SYM}` con el o los símbolos de las monedas que deseas consultar.
- Las monedas disponibles para su busqueda son las siguiente: BTC, ETH, USDT, BNB, EUR, BS 

### Obtener Información de Todas las Monedas

- **URL**: `http://localhost:3000/api/all-currencies`
- **Método**: `GET`

Estos endpoints te permitirán obtener la información actualizada de los precios de las monedas disponibles y realizar conversiones entre ellas basadas en tasas en tiempo real y una tasa fija para el Bolívar si es necesario.


