import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currencySymbol = '₹' //use to include currency symbol throughout the app

    const backendUrl = import.meta.env.VITE_BACKEND_URL //use to include backend url throughout the app
    const [workers, setWorkers] = useState([])

    const [token,setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)

    // Getting workers using API
    const getWorkersData = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/worker/list')
            if (data.success) {
                setWorkers(data.workers)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    const value = {
        workers,
        currencySymbol,
        backendUrl,
        token, setToken,
        backendUrl
    }

    useEffect(() => {
        getWorkersData()
    }, [])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider