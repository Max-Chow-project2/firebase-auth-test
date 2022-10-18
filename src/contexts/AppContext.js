import { createContext, useState, useEffect } from "react";
import { auth, firebaseDB } from "../firebase";
import { get, ref, onValue} from "firebase/database"
// https://firebase.google.com/docs/auth/web/manage-users
import { onAuthStateChanged } from 'firebase/auth';


const AppContext = createContext();

export function AppProvider({ children }) {
    const [user, setUser] = useState({});
    const [userDBRef, setUserDBRef] = useState({});


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            //user.email to get their email
            //user.uid to get their unique id
            setUser((prevState) => (user));
            setUserDBRef((prevState) => (ref(firebaseDB, `${user?.uid}`)));

            // if user is anonymous, set the uid to 'anonymous' to avoid multiple anon uids (1 account only)
            if (user?.isAnonymous === true) {
                user.uid = 'anonymous';
                user.displayName = 'Anonymous';
            }
        })
    }, [])


    return (
        <AppContext.Provider value={{ auth, firebaseDB, user, userDBRef }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;