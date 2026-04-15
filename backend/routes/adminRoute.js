import express from 'express'
import { addWorker , loginAdmin, allWorkers, appointmentsAdmin, appointmentCancel, adminDashboard} from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailablity } from '../controllers/workerController.js'

const adminRouter = express.Router()

adminRouter.post('/add-worker',authAdmin, upload.single('image'), addWorker) //add-worker image route

adminRouter.post('/login',loginAdmin) //login detail route

adminRouter.get('/all-workers',authAdmin, allWorkers) //get all workers route

adminRouter.post('/change-availability',authAdmin, changeAvailablity) //change worker availability route

adminRouter.get('/appointments',authAdmin, appointmentsAdmin) //get all appointments route

adminRouter.post('/cancel-appointment',authAdmin, appointmentCancel) //appointment cancellation route

adminRouter.get('/dashboard' , authAdmin, adminDashboard) 


export default adminRouter
