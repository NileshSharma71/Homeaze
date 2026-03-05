import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import workerRouter from './routes/workerRoute.js'

//app config
const app = express()
const port = process.env.PORT || 4000
connectDB() //this will connect the db
connectCloudinary() //this will connect the cloudinary

//middlewares
app.use(express.json())
app.use(cors())

//api endpoints
app.use("/api/admin", adminRouter) //admin routes
// localhost:4000/api/admin/add-worker

app.use("/api/worker", workerRouter) //worker routes


app.get("/", (req, res) => {
  res.send("API Working great")
});

app.listen(port, () => console.log(`Server started on PORT:${port}`))