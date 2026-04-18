//for making the worker route
import express from 'express'
import { workerList, loginWorker, workerAppointments, appointmentCancel, appointmentComplete , workerDashboard} from '../controllers/workerController.js'
import authWorker from '../middlewares/authWorker.js'

const workerRouter = express.Router()

workerRouter.get('/list', workerList)

workerRouter.post('/login', loginWorker)

workerRouter.get('/appointments',authWorker,workerAppointments)

workerRouter.post('/cancel-appointment',authWorker,appointmentCancel)

workerRouter.post('/complete-appointment',authWorker,appointmentComplete)

workerRouter.get('/dashboard',authWorker,workerDashboard)

export default workerRouter