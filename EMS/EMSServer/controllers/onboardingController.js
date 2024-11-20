// In your controllers/onboardingController.js

const Task = require('../models/Task'); // Assuming you have a Task model

// Controller to get all onboarding tasks
const getOnboardingTasks = async (req, res) => {
  try {
    const tasks = await Task.find(); // Retrieve tasks from the database
    res.status(200).json({ tasks }); // Send tasks as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong while fetching tasks.' });
  }
};

module.exports = {
  getOnboardingTasks,
};
