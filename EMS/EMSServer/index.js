import express from 'express';
import cors from 'cors';
import authRouter from './Routes/auth.js';
import departmentRouter from './Routes/department.js';
import employeeRouter from './Routes/employee.js';
import dashboardRouter from './Routes/dashboard.js';
import onboardingRouter from './Routes/onboarding.js'; // Import the onboarding routes
import connectToDatabase from './db/db.js';

connectToDatabase();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public/uploads'));

app.use('/api/auth', authRouter);
app.use('/api/department', departmentRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/onboarding', onboardingRouter); // Add the onboarding route

app.listen(process.env.PORT, () => {
    console.log(`Server is Running on port ${process.env.PORT}`);
});


    