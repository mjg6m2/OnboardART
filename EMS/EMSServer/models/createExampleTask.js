// createExampleTasks.js

import mongoose from 'mongoose';
import Onboarding from './models/Onboarding'; // Adjust the path as necessary

const createExampleTasks = async () => {
  try {
    const tasks = [
      {
        taskName: "Complete Orientation",
        dueDate: new Date("2024-12-01"), // Example due date
        description: "Complete the company orientation session.",
      },
      {
        taskName: "Watch Training Video",
        dueDate: new Date("2024-12-05"), // Example due date
        description: "Watch the training video on safety protocols.",
      },
    ];

    await Onboarding.insertMany(tasks); // Insert tasks into the Onboarding collection
    console.log("Example tasks created successfully!");
  } catch (error) {
    console.error("Error creating tasks: ", error);
  } finally {
    mongoose.connection.close(); // Close the connection after the operation
  }
};

// Connect to MongoDB and run the task creation
mongoose.connect('mongodb://localhost:27017/yourDBName', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB...");
    createExampleTasks();
  })
  .catch(error => console.error("Error connecting to MongoDB: ", error));
