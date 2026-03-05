import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')

    const [workers, setWorkers] = useState([])

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    // Getting all workers data from Database using API
    const getAllWorkers = async () => {

        try {
            const { data } = await axios.get(backendUrl + '/api/admin/all-workers', { headers: { aToken } })
            if (data.success) {
                setWorkers(data.workers)
                console.log(data.workers)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Function to change worker availablity using API
    const changeAvailability = async (workerId) => {
        try {

            const { data } = await axios.post(backendUrl + '/api/admin/change-availability', { workerId }, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                getAllWorkers()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const value = {
        aToken, setAToken,
        backendUrl, workers,
        getAllWorkers, changeAvailability
    }
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider