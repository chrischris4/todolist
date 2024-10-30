const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/signup', userController.createUser);

router.post('/login', userController.login);

router.get('/profile', auth, userController.getUserName);

router.get('/users', userController.getAllUsers);

router.get('/:id', userController.getUserById);

module.exports = router;
