import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";

export const WorkerContext = createContext();

const WorkerContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : "",
  );

  const [appointments, setAppointments] = useState([]);

  const [dashData, setDashData] = useState(false);

  const [profileData, setProfileData] = useState(false);

  // Getting worker appointment data from Database using API
  const getAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/worker/appointments",
        { headers: { dtoken: dToken } },
      );

      if (data.success) {
        setAppointments(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Function to Mark appointment completed using API
  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/worker/complete-appointment",
        { appointmentId },
        { headers: { dtoken: dToken } },
      );

      if (data.success) {
        toast.success(data.message);
        getAppointments();
        // Later after creating getDashData Function
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  // Function to cancel worker appointment using API

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/worker/cancel-appointment",
        { appointmentId },
        { headers: { dtoken: dToken } },
      );

      if (data.success) {
        toast.success(data.message);
        getAppointments();
        // after creating dashboard
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  // Getting Doctor dashboard data using API
  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/worker/dashboard", {
        headers: { dtoken: dToken },
      });

      if (data.success) {
        setDashData(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Getting worker profile data from Database using API
  const getProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/worker/profile", {
        headers: { dtoken: dToken },
      });
      console.log(data.profileData);
      setProfileData(data.profileData);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    dToken,
    setDToken,
    backendUrl,
    appointments,
    getAppointments,
    cancelAppointment,
    completeAppointment,
    dashData,
    getDashData,
    setDashData,
    profileData,
    setProfileData,
    getProfileData,
  };
  return (
    <WorkerContext.Provider value={value}>
      {props.children}
    </WorkerContext.Provider>
  );
};

export default WorkerContextProvider;
