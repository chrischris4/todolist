const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task');
const auth = require('../middleware/auth');

router.post('/createTask', auth, taskController.createTask);
router.get('/getAllTask', taskController.getAllTasks);
router.get('/tasks/:id', taskController.getTaskById);
router.put('/tasks/:id', taskController.updateTask);

module.exports = router;
