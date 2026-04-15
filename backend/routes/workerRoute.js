//for making the worker route
import express from 'express'
import { workerList, loginWorker, workerAppointments } from '../controllers/workerController.js'
import authWorker from '../middlewares/authWorker.js'

const workerRouter = express.Router()

workerRouter.get('/list', workerList)

workerRouter.post('/login', loginWorker)

workerRouter.get('/appointments',authWorker,workerAppointments)

export default workerRouter