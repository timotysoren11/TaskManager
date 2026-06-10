const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');

const {
    createTask,
    getTasksByUserId,
    updateTask,
    deleteTask,
    toggleTaskStatus
} = require('../controllers/taskController');

// Route to create a new task
router.post('/tasks', authMiddleware, createTask);
router.get('/tasks', authMiddleware, getTasksByUserId);
router.put('/tasks/:id', authMiddleware, updateTask);
router.delete('/tasks/:id', authMiddleware, deleteTask);
router.patch('/tasks/:id/toggle', authMiddleware, toggleTaskStatus);

module.exports = router;