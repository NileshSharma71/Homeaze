//for making the worker route
import express from 'express'
import { workerList } from '../controllers/workerController.js'

const workerRouter = express.Router()

workerRouter.get('/list', workerList)

export default workerRouter