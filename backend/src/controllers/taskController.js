const Task = require('../models/Task');
const User = require('../models/User');
const authService = require('../services/authServices');


exports.create = async (req, res) => {

    const { title, assignedTo, description } = req.body;
    const user = req.user;

    try {

        const assignees = [];
        for (const assignee of assignedTo) {
            const loc = await User.findById(assignee);
            assignees.push(loc);
        }

        const newTask = new Task({ title, description, createdBy: user._id, assignedTo });

        newTask.save();

        for (const people of assignees) {
            people.tasks.push(newTask._id);
            people.save()
        }

        res.status(201).json({ message: 'Task created successfully' });

    } catch (er) {

        console.log(er);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.changeStatus = async (req, res) => {

    const { _id, status } = req.body;
    const user = req.user;

    try {


        const oldTask = await Task.findById(_id);
        console.log(oldTask)
        console.log(_id)

        if (!oldTask) {
            res.status(404).json({ message: 'Task not found' });
        }else{

            let testin = false
            for (const assignee of oldTask.assignedTo){
                if(assignee == user._id.toString()) testin = true;
            }
            // If the task is not assigned to that user, don't allowed the change
            if (!testin) res.status(401).json({ message: 'Not allowed' });

        }
        
        oldTask.status = status;
        oldTask.save();

        res.status(201).json({ message: 'Task updated successfully' });
    } catch (er) {
        console.log(er);
        res.status(500).json({ message: 'Server error' });
    }
}


