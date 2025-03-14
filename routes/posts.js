const express = require('express');
const Post = require('../models/post'); // Importamos el modelo
const router = express.Router();

// POST /create - Crear un nuevo post
router.post('/create', async (req, res) => {
    try {
        const { title, description } = req.body;
        // Verificar si el título ya existe
        if (!title || !description) {
            return res.status(400).json({ message: 'Por favor, añade un título y una descripción' });
        }
        const newPost = new Post({ title, description });
        await newPost.save();

        res.status(201).json({
            message: 'Post creado correctamente',
            post: newPost,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el post', error });
    }
});

// GET / - Obtener todos los posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al obtener los posts', error });
    }
});

// GET /id/:id - Obtener un post por ID
router.get('/id/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }
        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al obtener el post', error });
    }
});

// GET /title/:title - Obtener un post por título
router.get('/title/:title', async (req, res) => {
    try {
        const post = await Post.findOne({ title: req.params.title });
        if (!post) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }
        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al obtener el post', error });
    }
});

// PUT /id/:id - Actualizar un post por ID
router.put('/id/:id', async (req, res) => {
    try {
        const { title, description } = req.body;
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { title, description },
            { new: true } // new: true para devolver el post actualizado
        );
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }
        res.status(200).json({
            message: 'Post actualizado correctamente',
            post: updatedPost,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al actualizar el post', error });
    }
});

// DELETE /id/:id - Eliminar un post por ID
router.delete('/id/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }
        res.status(200).json({ message: 'Post eliminado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al eliminar el post', error });
    }
});

module.exports = router;
