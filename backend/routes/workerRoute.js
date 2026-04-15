//for making the worker route
import express from 'express'
import { workerList, loginWorker } from '../controllers/workerController.js'

const workerRouter = express.Router()

workerRouter.get('/list', workerList)

workerRouter.post('/login', loginWorker)

export default workerRouter