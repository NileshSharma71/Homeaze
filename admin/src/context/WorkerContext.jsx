import { createContext } from "react";

export const WorkerContext = createContext()

const WorkerContextProvider = (props) => {
    
    const value = {

    }
    return (
        <WorkerContext.Provider value={value}>
            {props.children}
        </WorkerContext.Provider>
    )
}

export default WorkerContextProvider