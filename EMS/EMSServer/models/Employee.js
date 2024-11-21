import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const employeeSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  employeeId: { type: String, required: true, unique: true },
  dob: { type: Date },
  gender: { type: String },
  maritalStatus: { type: String },
  designation: { type: String },
  department: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
  salary: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  onboardingTasks: [
    {
      taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Onboarding' },
      taskName: { type: String },          // Name of the task
      dueDate: { type: Date },             // Due date for the task
      completed: { type: Boolean, default: false }, // Whether the task is completed or not
      assignedAt: { type: Date, default: Date.now }, // When the task was assigned
    },
  ],
});

// Method to mark a task as completed
employeeSchema.methods.markTaskAsCompleted = async function (taskId) {
  const task = this.onboardingTasks.find(task => task.taskId.toString() === taskId.toString());
  if (task) {
    task.completed = true;
    await this.save();
  }
};

// Method to get all tasks for an employee
employeeSchema.methods.getAssignedTasks = function () {
  return this.onboardingTasks;
};

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
