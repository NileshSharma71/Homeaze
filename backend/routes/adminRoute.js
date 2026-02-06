import express from 'express'
import { addWorker } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'

const adminRouter = express.Router()

adminRouter.post('/add-worker', upload.single('image'), addWorker)

export default adminRouter
