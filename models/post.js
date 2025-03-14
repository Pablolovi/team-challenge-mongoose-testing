const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: [true, 'Por favor, el título es obligatorio'], // Validación
        unique: true, // Para que no se repita
        trim: true, // Quitar espacios en blanco
        maxlength: [100, 'El título no puede tener más de 100 caracteres'], // Longitud máxima
      },
      description: {
        type: String,
        required: [true, 'Por favor, añade una descripción'], // Validación
      },
    },
    {
      timestamps: true, // Esto agrega `createdAt` y `updatedAt` automáticamente
    }
  );
  
  module.exports = mongoose.model('Post', PostSchema); // Exportamos el modelo  