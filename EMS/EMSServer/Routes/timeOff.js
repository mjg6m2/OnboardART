import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { reqTimeOff, getTimeOff } from '../controllers/timeOffController.js'

const router = express.Router()

router.post('/add', authMiddleware, reqTimeOff)
router.get('/:id', authMiddleware, getTimeOff)

export default router