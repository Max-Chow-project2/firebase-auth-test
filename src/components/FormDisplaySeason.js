import {ref, get, onValue} from "firebase/database"
import { useContext } from "react";
import { useState, useEffect } from "react";
import AppContext from "../contexts/AppContext";

export default function FormDisplaySeason() {

    const { firebaseDB, user } = useContext(AppContext);
    const [season, setSeason] = useState([]);

    useEffect(() => {

        const userDBRef = ref(firebaseDB, `/${user?.uid}/`)
        
        onValue(userDBRef, (response) => {
            if (response.exists()) {
                setSeason((prevState) => Object.keys(response.val()))
                console.log(response.val())
            }
        })

    }, [])

    const handleSelectSeason = function (e) {
        // TODO
    }

    return (
        <form>
            <p>FormDisplaySeason</p>
            <select onChange={(e) => { handleSelectSeason(e) }} id="selectSeason">
                {season.map((item) => {
                    return (
                        // TODO: add keys, and handleSelectSeason
                        <option>{item}</option>
                    )                    
                })}
            </select>
        </form>
    )
}