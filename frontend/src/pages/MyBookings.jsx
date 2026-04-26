<<<<<<< HEAD
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyBookings = () => {
  const { backendUrl, token, getWorkersData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Format date
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
  };

  // Get appointments
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Cancel booking
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } },
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getWorkersData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Razorpay popup
  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,

      handler: async (response) => {
        try {
          const { data } = await axios.post(
            backendUrl + "/api/user/verifyRazorpay",
            response,
            { headers: { token } },
          );

          if (data.success) {
            toast.success("Payment Successful ✅");
            getUserAppointments();
          } else {
            toast.error("Payment Failed ❌");
          }
        } catch (error) {
          toast.error(error.message);
        }
      },

      modal: {
        ondismiss: function () {
          toast.error("Payment Cancelled ❌");
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // Create order
  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-razorpay",
        { appointmentId },
        { headers: { token } },
      );

      if (data.success) {
        initPay(data.order);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My Bookings
      </p>

      <div>
        {appointments.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No bookings found</p>
        )}

        {appointments.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
          >
            <div>
              <img
                className="w-32 bg-indigo-50"
                src={item.docData?.image}
                alt=""
              />
            </div>

            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">
                {item.docData.name}
              </p>
              <p>{item.docData.speciality}</p>

              <p className="text-zinc-700 font-medium mt-1">Address:</p>
              <p className="text-xs">{item.docData?.address?.line1}</p>
              <p className="text-xs">{item.docData?.address?.line2}</p>

              <p className="text-xs mt-1">
                <span className="text-sm font-medium">Date & Time:</span>{" "}
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>

            <div className="flex flex-col gap-2 justify-end">
              {/* Pay Button (only if not paid) */}
              {!item.payment && !item.cancelled && !item.isCompleted && (
                <button
                  onClick={() => appointmentRazorpay(item._id)}
                  className="text-sm py-2 border rounded hover:bg-primary hover:text-white"
                >
                  Pay Online
                </button>
              )}

              {/* Cancel Button (ALLOW even after payment) */}
              {!item.cancelled && !item.isCompleted && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="text-sm py-2 border rounded hover:bg-red-600 hover:text-white"
                >
                  Cancel Booking
                </button>
              )}

              {/* Paid */}
              {item.payment && !item.cancelled && !item.isCompleted && (
                <button className="text-sm text-green-600 py-2 border rounded bg-green-100">
                  Paid
                </button>
              )}

              {/* Cancelled */}
              {item.cancelled && !item.isCompleted && (
                <button className="text-sm text-red-500 py-2 border rounded bg-red-100">
                  Booking Cancelled
                </button>
              )}

              {/* Completed */}
              {item.isCompleted && (
                <button className="text-sm text-blue-600 py-2 border rounded bg-blue-100">
                  Booking Completed
                </button>
              )}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
=======
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyBookings = () => {
  const { backendUrl, token, getWorkersData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Format date
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
  };

  // Get appointments
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Cancel booking
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } },
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getWorkersData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Razorpay popup
  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,

      handler: async (response) => {
        try {
          const { data } = await axios.post(
            backendUrl + "/api/user/verifyRazorpay",
            response,
            { headers: { token } },
          );

          if (data.success) {
            toast.success("Payment Successful ✅");
            getUserAppointments();
          } else {
            toast.error("Payment Failed ❌");
          }
        } catch (error) {
          toast.error(error.message);
        }
      },

      modal: {
        ondismiss: function () {
          toast.error("Payment Cancelled ❌");
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // Create order
  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-razorpay",
        { appointmentId },
        { headers: { token } },
      );

      if (data.success) {
        initPay(data.order);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My Bookings
      </p>

      <div>
        {appointments.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No bookings found</p>
        )}

        {appointments.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
          >
            <div>
              <img
                className="w-32 bg-indigo-50"
                src={item.docData?.image}
                alt=""
              />
            </div>

            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">
                {item.docData.name}
              </p>
              <p>{item.docData.speciality}</p>

              <p className="text-zinc-700 font-medium mt-1">Address:</p>
              <p className="text-xs">{item.docData?.address?.line1}</p>
              <p className="text-xs">{item.docData?.address?.line2}</p>

              <p className="text-xs mt-1">
                <span className="text-sm font-medium">Date & Time:</span>{" "}
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>

            <div className="flex flex-col gap-2 justify-end">
              {/* Pay Button (only if not paid) */}
              {!item.payment && !item.cancelled && (
                <button
                  onClick={() => appointmentRazorpay(item._id)}
                  className="text-sm py-2 border rounded hover:bg-primary hover:text-white"
                >
                  Pay Online
                </button>
              )}

              {/* Cancel Button (ALLOW even after payment) */}
              {!item.cancelled && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="text-sm py-2 border rounded hover:bg-red-600 hover:text-white"
                >
                  Cancel Booking
                </button>
              )}

              {/* Paid */}
              {item.payment && !item.cancelled && (
                <button className="text-sm text-green-600 py-2 border rounded bg-green-100">
                  Paid
                </button>
              )}

              {/* Cancelled */}
              {item.cancelled && (
                <button className="text-sm text-red-500 py-2 border rounded bg-red-100">
                  Booking Cancelled
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
>>>>>>> 69b6e65 (Add existing project files and Ubuntu setup)
