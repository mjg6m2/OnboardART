import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Adjust model name
    status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }, // Adjust model name
    createdAt: { type: Date, default: Date.now },
});

const Task = mongoose.model('Task', taskSchema);

export default Task; // Add this default export
