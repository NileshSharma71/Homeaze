import workerModel from "../models/workerModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import bookingModel from "../models/bookingModel.js";
import { OAuth2Client } from "google-auth-library";
import razorpay from "razorpay";
import { sendRefundNotificationEmail } from "../utils/emailService.js";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

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

// API to mark appointment completed for worker panel
const appointmentComplete = async (req, res) => {
    try {

        const { appointmentId } = req.body;
        const workerId = req.workerId;

        const appointmentData = await bookingModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId === workerId) {
            await bookingModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
            return res.json({ success: true, message: 'Appointment Completed' })
        }

        res.json({ success: false, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to cancel appointment for worker panel
const appointmentCancel = async (req, res) => {
    try {

        const { appointmentId } = req.body;
        const workerId = req.workerId;

        const appointmentData = await bookingModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId === workerId) {
            await bookingModel.findByIdAndUpdate(appointmentId, { cancelled: true })

            // Releasing the slot in worker model
            const worker = await workerModel.findById(workerId);
            if (worker) {
                let slots_booked = worker.slots_booked || {};
                if (slots_booked[appointmentData.slotDate]) {
                    slots_booked[appointmentData.slotDate] = slots_booked[appointmentData.slotDate].filter(
                        (time) => time !== appointmentData.slotTime
                    );
                    if (slots_booked[appointmentData.slotDate].length === 0) {
                        delete slots_booked[appointmentData.slotDate];
                    }
                    await workerModel.findByIdAndUpdate(workerId, { slots_booked });
                }
            }

            // Handle refund and email
            try {
                if (appointmentData.payment && appointmentData.paymentId) {
                    // Initiate refund
                    await razorpayInstance.payments.refund(appointmentData.paymentId, {
                        amount: appointmentData.amount * 100, // Amount in paise
                        speed: "optimum" // optimum or normal
                    });

                    // Send email
                    await sendRefundNotificationEmail(
                        appointmentData.userData.email,
                        appointmentData.userData.name,
                        appointmentData.amount,
                        appointmentData.docData.name,
                        appointmentData.slotDate,
                        appointmentData.slotTime
                    );
                } else if (appointmentData.userData && appointmentData.userData.email) {
                    // Just send cancellation email, no refund
                    await sendRefundNotificationEmail(
                        appointmentData.userData.email,
                        appointmentData.userData.name,
                        0, // no refund
                        appointmentData.docData.name,
                        appointmentData.slotDate,
                        appointmentData.slotTime
                    );
                }
            } catch (refundError) {
                console.error("Refund or Email Error:", refundError);
                // We log the error but don't stop the cancellation process
            }

            return res.json({ success: true, message: 'Appointment Cancelled' })
        }

        res.json({ success: false, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// worker dashboard API
const workerDashboard = async (req, res) => {
  try {
    const workerId = req.workerId;

    const appointments = await bookingModel.find({ docId: workerId });

    let earnings = 0;
    let patients = new Set();

    appointments.forEach((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
      patients.add(item.userId);
    });

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.size,
      latestAppointments: [...appointments].reverse(),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to get worker profile for  worker Panel
const workerProfile = async (req, res) => {
  try {
    const workerId = req.workerId;

    const profileData = await workerModel
      .findById(workerId)
      .select('-password');

    res.json({ success: true, profileData });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to update worker profile data from  Worker Panel
const updateWorkerProfile = async (req, res) => {
  try {
    const workerId = req.workerId;
    const { fees, address, available } = req.body;

    await workerModel.findByIdAndUpdate(workerId, {
      fees,
      address,
      available
    });

    res.json({ success: true, message: 'Profile Updated' });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API for Google login (worker must already exist in DB)
const googleLoginWorker = async (req, res) => {
    try {
        const { credential } = req.body;

        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { email } = payload;

        const worker = await workerModel.findOne({ email });

        if (!worker) {
            return res.json({ success: false, message: "Worker not registered. Contact admin." });
        }

        const token = jwt.sign({ id: worker._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { changeAvailablity, workerList, loginWorker, googleLoginWorker, workerAppointments, appointmentComplete, appointmentCancel, workerDashboard, workerProfile, updateWorkerProfile };
