const express = require('express');


const userController = require('../controllers/user');

const router = express.Router();

// GET /users
router.get('/users', userController.getUsers);

// POST /user
router.post('/user', userController.createUser);

//GET /user:id
router.get('/user/:userId', userController.getUser);

//PUT /user:id
router.put('/user/:userId', userController.updateUser);

module.exports = router;
