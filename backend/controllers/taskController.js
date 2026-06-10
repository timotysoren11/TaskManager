const Task = require('../models/Task');

// Task Creation
exports.createTask = async (req, res ) => {
    try {
        const { 
            title,
            description,
            priority,
            dueDate
        } = req.body;

        // checking if the title is provided
        if(!title || !description) {
            return res.status(400).json({ error: 'Title and description are required' });
        }

        // new task creation
        const task = new Task({
            title,
            description,
            priority,
            dueDate,
            userId: req.user.userId
        });
        
        await task.save();
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Getting tasks
exports.getTasksByUserId = async (req, res) => {
    try {
        const tasks = await Task.find({
            userId: req.user.userId
        }).sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Task updation
exports.updateTask = async (req, res) => {
    try {

        const updatedTask = await Task.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.user.userId
            },
            req.body,
            {
                new : true,
                runValidators: true
            }
        );

        if (!updatedTask) {
            return res.status(404).json({
                error: "Task not found"
            });
        }

        res.status(200).json(updatedTask);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// Task deletion
exports.deleteTask = async (req, res) => {
    try {

        const deletedTask = await Task.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.userId
        });

        if (!deletedTask) {
            return res.status(404).json({
                error: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// Toggle status of the task
exports.toggleTaskStatus = async (req, res) => {
    try {

        const task = await Task.findOne({
            _id: req.params.id,
            userId: req.user.userId
        });

        if (!task) {
            return res.status(404).json({
                error: "Task not found"
            });
        }

        task.status =
            task.status === "pending"
                ? "completed"
                : "pending";

        await task.save();

        res.status(200).json(task);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};