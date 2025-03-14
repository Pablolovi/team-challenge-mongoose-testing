const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Importar la configuración de dotenv
console.log(process.env.MONGO_URI);
const postsRouter = require('./routes/posts'); // Importar el enrutador de posts

const app = express();
const PORT = process.env.PORT || 5001;


// Middleware para parsear JSON
app.use(express.json());


// Conectar a la base de datos
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected');
})
.catch((error) => {
    console.error('Error al conectar a MongoDB', error);
});


// Usamos las rutas definidas en posts.js
app.use('/posts', postsRouter);


// Ruta para la raíz
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API de la red social!');
});


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});