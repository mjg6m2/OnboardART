import express from 'express'
import authMiddleware from '../controllers/salaryController.js'
import { addSalary, getSalary } from '../controllers/salaryControllers.js'

const router = express.Router()

router.post('/add', authMiddleware, addSalary)
router.get('/:id', authMiddleware, getSalary)

export default router