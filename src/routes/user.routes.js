const express = require('express');
const { useImperativeHandle } = require('react');
const router = express.Router();

//Controlador USER
const user = require('../controllers/userController');

// API GET - Obtiene toda la lista de usuarios
router.get('/', user.list);

//API GET - Obtiene usuario por ID
router.get('/:id', user.show);

//API POST - Registra nuevo usuario
router.post('/', user.create);

//API PUT - Busca usuario por ID y lo actualiza
router.put('/:id', user.edit);

//API DELETE - Busca usuario por ID y lo elimina
router.delete('/:id', user.delete);

module.exports = router;