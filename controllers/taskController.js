const Task = require('../models/Task');

exports.createTask = async (req, res) => {
    try {
        const { user, body } = req;
        const { userId } = user;
        const { title, description } = body;

        const task = new Task({
            title,
            description,
            userId: userId
        });

        const savedTask = await task.save();

        res.status(201).json({ status: "success", message: "Task created successfully", task: savedTask });

    } catch (error) {
        res.status(500).json({ status: false, message: 'Error while creating task:::' });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { params, body } = req;
        const { id } = params;
        const { title, description, status } = body;

        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ status: false, message: 'Task not found' });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { title, description, status },
            { new: true });

        res.status(200).json({
            status: true,
            message: 'Task updated successfully',
            task: updatedTask
        });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Error whileupdating task:::' });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({
                status: "failure",
                message: "Task not found"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Task deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            status: "failure",
            message: "Error deleting task"
        });
    }
};


exports.getAllTasks = async (req, res) => {
    try {
        const { user, query } = req;
        const { userId } = user;
        let { page = 1, limit = 10 } = query;

        page = parseInt(page);
        limit = parseInt(limit);

        const skip = (page - 1) * limit;

        const tasks = await Task.find({ userId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);



        const count = await Task.countDocuments({ userId: userId });

        const pageInfo = {
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            count: count
        };

        res.status(200).json({
            status: true,
            message: 'tasks fetched successfully',
            tasks,
            pageInfo: pageInfo
        });
    } catch (error) {
        return res
            .status(500).json({
                status: false,
                message: 'Error fetching tasks::::'
            });
    }
};

exports.getTask = async (req, res) => {
    try {
        const { params } = req;
        const { id } = params;
        const task = await Task.findById(id);

        if (!task) {
            return res
                .status(404).json({
                    status: false,
                    message: 'Task not found'
                });
        }

        return res.status(200).json({ status: true, message: 'Task fetched successfully', task });
    } catch (error) {
        return res
            .status(500).json({
                status: false,
                message: 'Error while fetching task'
            });
    }
};


