const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { auth, admin } = require('../middleware/auth');

// Register and Login
router.post('/register', userController.registerUser);
router.post('/login', userController.login);

// User Management by admin
router.get('/users', auth, admin, userController.getAllUsers);
router.get('/:userId/tasks', auth, admin, userController.getSingleUserTasks);

module.exports = router;
