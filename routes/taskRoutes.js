const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { auth } = require('../middleware/auth');

// task crud operations by user
router.post('/task', auth, taskController.createTask);
router.put('/task/:id', auth, taskController.updateTask);
router.delete('/task/:id', auth, taskController.deleteTask);

router.get('/task', auth, taskController.getAllTasks);
router.get('/task/:id', auth, taskController.getTask);

module.exports = router;
