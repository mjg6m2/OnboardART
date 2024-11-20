import express from 'express'
import authMiddleware from '../controllers/salaryController.js'
import { changePassword } from '../controllers/settingController.js'

const router = express.Router()

router.put('/change-password', authMiddleware, changePassword)


export default router