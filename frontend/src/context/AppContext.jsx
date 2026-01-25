import { createContext } from "react";
import { workers } from "../assets/assets";

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const value = {
        workers
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider