import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { reqTimeOff } from '../controllers/timeOffController.js'

const router = express.Router()

router.post('/add', authMiddleware, reqTimeOff)

export default router