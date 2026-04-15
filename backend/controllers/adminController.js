import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import workerModel from '../models/workerModel.js'
import jwt from "jsonwebtoken";
import bookingModel from '../models/bookingModel.js';
import userModel from '../models/userModel.js'


// api for adding worker
const addWorker = async (req, res) => {

    try {

        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
        const imageFile = req.file;

        if (!imageFile) {
            return res.status(400).json({
                success: false,
                message: "Image file is required"
            });
        }

        // checking for all data to add worker
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing Details" })
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
        const hashedPassword = await bcrypt.hash(password, salt)

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url

        // save worker data to database
        const workerData = {
            name,
            email,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: typeof address === "string" ? JSON.parse(address) : address,// convert address string to object
            image: imageUrl,
            date: Date.now()
        }

        // return success response with worker data
        const newWorker = new workerModel(workerData)
        await newWorker.save()

        res.json({ success: true, message: "Worker added successfully" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// api for admin login
const loginAdmin = async (req, res) => {
    try {

        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "invalid credentials" })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to get all workers list for admin panel
const allWorkers = async (req, res) => {
    try {

        const workers = await workerModel.find({}).select('-password')
        res.json({ success: true, workers })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get all appointments list
const appointmentsAdmin = async (req, res) => {
    try {

        const appointments = await bookingModel.find({})
        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API for appointment cancellation
const appointmentCancel = async (req, res) => {
    try {
        const { appointmentId } = req.body;

        const appointment = await bookingModel.findById(appointmentId);

        if (!appointment) {
            return res.json({ success: false, message: "Appointment not found" });
        }

        // 🔥 REMOVE SLOT FROM WORKER
        const worker = await workerModel.findById(appointment.docId);

        if (worker) {
            let slots_booked = worker.slots_booked || {};

            if (slots_booked[appointment.slotDate]) {
                slots_booked[appointment.slotDate] =
                    slots_booked[appointment.slotDate].filter(
                        (time) => time !== appointment.slotTime
                    );

                if (slots_booked[appointment.slotDate].length === 0) {
                    delete slots_booked[appointment.slotDate];
                }

                await workerModel.findByIdAndUpdate(appointment.docId, {
                    slots_booked,
                });
            }
        }

        // ✅ CANCEL BOOKING
        appointment.cancelled = true;
        await appointment.save();

        res.json({
            success: true,
            message: "Appointment cancelled & slot updated",
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to get dashboard data for admin panel
const adminDashboard = async (req, res) => {
    try {

        const workers = await workerModel.find({})
        const users = await userModel.find({})
        const bookings = await bookingModel.find({})

        const dashData = {
            doctors: workers.length,
            appointments: bookings.length,
            patients: users.length,
            latestAppointments: bookings.reverse().slice(0, 5)
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


export { addWorker, loginAdmin, allWorkers, appointmentsAdmin, appointmentCancel, adminDashboard }