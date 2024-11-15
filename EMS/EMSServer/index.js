import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import authRouter from './Routes/auth.js'
import connectToDatabase from './db/db.js'
import departmentRouter from './Routes/department.js'

connectToDatabase()
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/department', departmentRouter)

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGODB_URI, {
    //useNewUrlParser: true,
    //useUnifiedTopology: true
})
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
        process.exit(1); // Exit the app if the database connection fails
    });

    