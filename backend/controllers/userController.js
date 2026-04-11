import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import workerModel from "../models/workerModel.js";
import bookingModel from "../models/bookingModel.js";
// import stripe from "stripe";
import razorpay from 'razorpay';
import crypto from "crypto";

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

        // ✅ ADD THIS BLOCK HERE
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await userModel.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

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

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

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

// API to get user appointments for frontend my-bookings page
const listAppointment = async (req, res) => {
    try {

        const userId = req.userId;
        const appointments = await bookingModel.find({ userId });

        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to cancel appointment
const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointment = await bookingModel.findById(appointmentId);

    if (!appointment) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    const worker = await workerModel.findById(appointment.docId);

    if (worker) {
      let slots_booked = worker.slots_booked || {};

      console.log("Before:", slots_booked);

      if (slots_booked[appointment.slotDate]) {
        slots_booked[appointment.slotDate] =
          slots_booked[appointment.slotDate].filter(
            (time) => time !== appointment.slotTime
          );

        if (slots_booked[appointment.slotDate].length === 0) {
          delete slots_booked[appointment.slotDate];
        }

        console.log("After:", slots_booked);

        await workerModel.findByIdAndUpdate(
          appointment.docId,
          { slots_booked },
          { new: true }
        );
      }
    }

    appointment.cancelled = true;
    await appointment.save();

    res.json({
      success: true,
      message: "Booking cancelled & slot updated",
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Gateway Initialize
// const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

// API to make payment of appointment using razorpay
const paymentRazorpay = async (req, res) => {
    try {
        const { appointmentId } = req.body;

        const appointmentData = await bookingModel.findById(appointmentId);

        if (!appointmentData || appointmentData.cancelled) {
            return res.json({ success: false, message: 'Appointment Cancelled or not found' });
        }

        if (appointmentData.payment) {
            return res.json({ success: false, message: "Already Paid" });
        }

        const options = {
            amount: appointmentData.amount * 100,
            currency: "INR",
            receipt: appointmentId,
        };

        const order = await razorpayInstance.orders.create(options);

        await bookingModel.findByIdAndUpdate(appointmentId, {
            razorpayOrderId: order.id
        });

        res.json({ success: true, order });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// API to verify payment of razorpay
const verifyRazorpay = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest("hex");

        if (expectedSignature === razorpay_signature) {

            const booking = await bookingModel.findOneAndUpdate(
                { razorpayOrderId: razorpay_order_id },
                {
                    payment: true,
                    paymentId: razorpay_payment_id   // ✅ VERY IMPORTANT
                },
                { new: true }
            );

            res.json({ success: true });

        } else {
            res.json({ success: false, message: "Signature mismatch" });
        }

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
    listAppointment,
    cancelAppointment,
    paymentRazorpay,
    verifyRazorpay
};