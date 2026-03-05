import workerModel from "../models/workerModel.js";


// API to change worker availablity for Admin and Worker Panel
const changeAvailablity = async (req, res) => {
    try {

        const { workerId } = req.body

        const workerData = await workerModel.findById(workerId)
        await workerModel.findByIdAndUpdate(workerId, { available: !workerData.available })
        res.json({ success: true, message: 'Availablity Changed' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { changeAvailablity }