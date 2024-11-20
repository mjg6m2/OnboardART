import express from 'express';

const router = express.Router();

// Your routes here
router.get('/', (req, res) => {
  res.send('Onboarding tasks route');
});

// Export the router
export default router; // Ensure you're using `export default`

