import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";

export const WorkerContext = createContext()

const WorkerContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [dToken, setDToken] = useState(localStorage.getItem("dToken") ? localStorage.getItem("dToken") : "")

    const [appointments, setAppointments] = useState([])

    // Getting worker appointment data from Database using API
    const getAppointments = async () => {
        try {

            const { data } = await axios.get(
                backendUrl + '/api/worker/appointments',
                { headers: { dtoken: dToken } }
            )

            if (data.success) {
                setAppointments(data.appointments.reverse())
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const value = {
    dToken,
    setDToken,
    backendUrl,
    appointments,
    getAppointments
}
    return (
        <WorkerContext.Provider value={value}>
            {props.children}
        </WorkerContext.Provider>
    )
}

export default WorkerContextProvider