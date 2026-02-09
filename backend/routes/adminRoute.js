import express from 'express'
import { addWorker , loginAdmin} from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'

const adminRouter = express.Router()

adminRouter.post('/add-worker',authAdmin, upload.single('image'), addWorker) //add-worker route

adminRouter.post('/login',loginAdmin) //login route

export default adminRouter
