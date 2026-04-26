<<<<<<< HEAD
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

export { changeAvailablity, workerList, loginWorker, workerAppointments, appointmentComplete, appointmentCancel , workerDashboard, workerProfile, updateWorkerProfile };
=======
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
>>>>>>> 69b6e65 (Add existing project files and Ubuntu setup)
