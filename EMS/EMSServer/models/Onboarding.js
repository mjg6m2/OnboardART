import mongoose from 'mongoose';

const onboardingTaskSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  dueDate: { type: Date, required: true }, // Task due date
  description: { type: String, required: true }, // Optional description of the task
  createdAt: { type: Date, default: Date.now }, // Task creation date
});

const Onboarding = mongoose.model('Onboarding', onboardingTaskSchema);

export default Onboarding;
