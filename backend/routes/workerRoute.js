<<<<<<< HEAD
//for making the worker route
import express from 'express'
import { workerList, loginWorker, workerAppointments, appointmentCancel, appointmentComplete , workerDashboard, workerProfile, updateWorkerProfile} from '../controllers/workerController.js'
import authWorker from '../middlewares/authWorker.js'

const workerRouter = express.Router()

workerRouter.get('/list', workerList)

workerRouter.post('/login', loginWorker)

workerRouter.get('/appointments',authWorker,workerAppointments)

workerRouter.post('/cancel-appointment',authWorker,appointmentCancel)

workerRouter.post('/complete-appointment',authWorker,appointmentComplete)

workerRouter.get('/dashboard',authWorker,workerDashboard)

workerRouter.get('/profile',authWorker,workerProfile)

workerRouter.post('/update-profile',authWorker,updateWorkerProfile)

=======
//for making the worker route
import express from 'express'
import { workerList, loginWorker, workerAppointments } from '../controllers/workerController.js'
import authWorker from '../middlewares/authWorker.js'

const workerRouter = express.Router()

workerRouter.get('/list', workerList)

workerRouter.post('/login', loginWorker)

workerRouter.get('/appointments',authWorker,workerAppointments)

>>>>>>> 69b6e65 (Add existing project files and Ubuntu setup)
export default workerRouter