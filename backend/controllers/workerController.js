import workerModel from "../models/workerModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import bookingModel from "../models/bookingModel.js";

// API to change worker availability
const changeAvailablity = async (req, res) => {
    try {

        const { workerId } = req.body;

        const workerData = await workerModel.findById(workerId);

        if (!workerData) {
            return res.json({ success: false, message: "Worker not found" });
        }

        await workerModel.findByIdAndUpdate(workerId, {
            available: !workerData.available
        });

        res.json({ success: true, message: "Availability Changed" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to get all workers for frontend
const workerList = async (req, res) => {
    try {

        const workers = await workerModel
            .find({})
            .select(["-password", "-email"]);

        res.json({ success: true, workers });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API for worker login (rename from doctor)
const loginWorker = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await workerModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            )

            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to get worker appointments for worker panel
const workerAppointments = async (req, res) => {
    try {

        const workerId = req.workerId;

        const appointments = await bookingModel.find({ docId: workerId });

        res.json({ success: true, appointments });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { changeAvailablity, workerList, loginWorker, workerAppointments };