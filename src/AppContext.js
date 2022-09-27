import { createContext, useState } from "react";
import firebaseDB from './firebaseSetup';

const AppContext = createContext();

export function AppProvider({ children }) {
    const [user, setUser] = useState({});

    return (
        <AppContext.Provider value={{ user, setUser, firebaseDB }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;