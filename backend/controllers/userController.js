import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import workerModel from "../models/workerModel.js";
import bookingModel from "../models/bookingModel.js";

// api to register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing Details" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid Email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Weak Password" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await userModel.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({ success: true, token });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// api to login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({ success: true, token });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// api to get profile
const getProfile = async (req, res) => {
    try {
        const userId = req.userId; // ✅ FIXED

        const userData = await userModel
            .findById(userId)
            .select("-password");

        res.json({ success: true, userData });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// api toupdate profile
const updateProfile = async (req, res) => {
    try {
        const userId = req.userId; // ✅ FIXED
        const { name, phone, address, dob, gender } = req.body;

        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Missing Data" });
        }

        await userModel.findByIdAndUpdate(userId, {
            name,
            phone,
            address: address ? JSON.parse(address) : {}, // ✅ SAFE
            dob,
            gender,
        });

        if (req.file) {
            const upload = await cloudinary.uploader.upload(req.file.path);
            await userModel.findByIdAndUpdate(userId, {
                image: upload.secure_url,
            });
        }

        res.json({ success: true, message: "Profile Updated" });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// api to book appointment
const bookAppointment = async (req, res) => {
    try {
        const userId = req.userId; // ✅ FIXED
        const { docId, slotDate, slotTime } = req.body;

        const worker = await workerModel
            .findById(docId)
            .select("-password");

        if (!worker) {
            return res.json({ success: false, message: "Worker not found" });
        }

        if (!worker.available) {
            return res.json({
                success: false,
                message: "Worker not available",
            });
        }

        let slots_booked = worker.slots_booked || {};

        if (!slots_booked[slotDate]) {
            slots_booked[slotDate] = [];
        }

        if (slots_booked[slotDate].includes(slotTime)) {
            return res.json({
                success: false,
                message: "Slot not available",
            });
        }

        // book slot
        slots_booked[slotDate].push(slotTime);

        const user = await userModel
            .findById(userId)
            .select("-password");

        const appointment = await bookingModel.create({ // ✅ FIXED MODEL
            userId,
            docId,
            userData: user,
            docData: worker,
            amount: worker.fees,
            slotDate,
            slotTime,
            date: Date.now(),
        });

        await workerModel.findByIdAndUpdate(docId, { slots_booked });

        res.json({
            success: true,
            message: "Appointment booked",
            appointment,
        });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// export controllers
export {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
    bookAppointment,
};