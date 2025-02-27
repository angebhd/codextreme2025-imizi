const Task = require('../models/Task');
const User = require('../models/User');
const authService = require('../services/authServices');


exports.create = async (req, res) => {

    const { title, assignedTo, description } = req.body;
    const user = req.user;

    try {

        const assignees = [];
        for (const assignee of assignedTo){
            const loc = await User.findById(assignee);
            assignees.push(loc);
        }
        
        const newTask = new Task({ title, description, createdBy: user._id, assignedTo });

        newTask.save();

        for (const people of assignees){
            people.tasks.push(newTask._id);
            people.save()
        }

        res.status(201).json({ message: 'Task created successfully' });

    } catch (er) {

        console.log(er);
        res.status(500).json({ message: 'Server error' });
    }
}

