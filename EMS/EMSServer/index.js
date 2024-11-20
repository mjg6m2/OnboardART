import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import authRouter from './Routes/auth.js'
import timeOffRouter from './Routes/timeOff.js'
import settingRouter from './Routes/setting.js'
import departmentRouter from './Routes/department.js';
import employeeRouter from './Routes/employee.js';
import dashboardRouter from './Routes/dashboard.js';
import onboardingRouter from './Routes/onboarding.js';
import connectToDatabase from './db/db.js'

connectToDatabase()
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/time-off', timeOffRouter)
app.use('/api/setting', settingRouter)
app.use('/api/department', departmentRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/onboarding', onboardingRouter);

app.use(express.static('public/uploads'));

app.listen(process.env.PORT, () => {
    console.log(`Server is Running on port ${process.env.PORT}`);
});


    