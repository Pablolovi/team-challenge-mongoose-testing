const request = require('supertest');
const app = require('../index'); // Asegúrate de exportar tu app en index.js
const Post = require('../models/post');

// Limpiar la base de datos antes de cada prueba
beforeEach(async () => {
  await Post.deleteMany();
});

describe('POST /create', () => {
  it('debería crear un nuevo post', async () => {
    const newPost = {
        title: 'Mi primer post',
        description: 'Este es mi primer post en la red social',
    };

    const response = await request(app).post('/create').send(newPost);  

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Post creado correctamente');
    expect(response.body.post.title).toBe(newPost.title);
  });

  it('debería devolver un error si no se proporciona un título ni descripción', async () => {
    const newPost = { title: '', description: '' }; // Aquí defines un post vacío para probar la validación
    
    const response = await request(app).post('/create').send(newPost); // Envías el post sin título ni descripción

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Por favor, añade un título y una descripción');
  });

  it('debería devolver un error si no se proporciona un título', async () => {
    const newPost = { title: '', description: 'Este es mi post sin título' }; // Sólo falta el título
    
    const response = await request(app).post('/create').send(newPost); // Envías el post sin título

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Por favor, añade un título y una descripción');
  });

  it('debería devolver un error si no se proporciona una descripción', async () => {
    const newPost = { title: 'Post sin descripción', description: '' }; // Sólo falta la descripción
    
    const response = await request(app).post('/create').send(newPost); // Envías el post sin descripción

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Por favor, añade un título y una descripción');
  });
});

describe('GET /', () => {
  it('debería devolver todos los posts', async () => {
    const post1 = new Post({
      title: 'Post 1', 
      description: 'Este es mi primer post en la red social',
    });
    const post2 = new Post({
      title: 'Post 2', 
      description: 'Este es mi segundo post en la red social',
    });

    await post1.save();
    await post2.save();

    const response = await request(app).get('/');  // Realiza la petición GET

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].title).toBe('Post 1');
    expect(response.body[1].title).toBe('Post 2');
  });
});
