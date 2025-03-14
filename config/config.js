const express = require('express');
const connectDB = require('./config/config'); // Importa la función para conectar

const app = express();

// Conectar a la base de datos
connectDB();

// Iniciar servidor en el puerto especificado en .env
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});