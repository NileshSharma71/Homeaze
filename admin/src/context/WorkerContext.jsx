import { useState } from "react";
import { createContext } from "react";

export const WorkerContext = createContext()

const WorkerContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const[dToken, setDToken] = useState(localStorage.getItem("dToken") ? localStorage.getItem("dToken") : "")
    
    const value = {
        dToken,setDToken,
        backendUrl
    }
    return (
        <WorkerContext.Provider value={value}>
            {props.children}
        </WorkerContext.Provider>
    )
}

export default WorkerContextProvider