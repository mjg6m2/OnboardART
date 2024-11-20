import express from 'express';
import Task from '../models/Task.js'; // Ensure this path is correct
const router = express.Router();

// Create a new task (for onboarding)
router.post('/', async (req, res) => {
    try {
        const { title, description, assignedTo, createdBy } = req.body;
        const newTask = new Task({ title, description, assignedTo, createdBy });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: 'Error creating task', error });
    }
});

// Get all tasks (for admins or employees to see)
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find().populate('assignedTo').populate('createdBy');
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
});

// Update task status (e.g., mark as completed)
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // "Pending" or "Completed"
        const updatedTask = await Task.findByIdAndUpdate(id, { status }, { new: true });
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error });
    }
});

export default router; // Make sure to export the router
