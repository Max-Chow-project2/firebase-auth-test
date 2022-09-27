import { createContext, useState, useEffect } from "react";
import { auth, firebaseDB } from "./firebase";
// https://firebase.google.com/docs/auth/web/manage-users
import { onAuthStateChanged } from 'firebase/auth';

const AppContext = createContext();

export function AppProvider({ children }) {
    const [user, setUser] = useState({});

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            //user.email to get their email
            //user.uid to get their unique id
            setUser(user);
        })
    }, [])

    return (
        <AppContext.Provider value={{ auth, firebaseDB, user, setUser }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;