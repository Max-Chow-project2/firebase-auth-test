import { useState, useContext } from "react"
import AppContext from "../contexts/AppContext"
import {ref, get, push} from "firebase/database"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function FormCreateSeason() {

    const { firebaseDB, user } = useContext(AppContext)
    const [season, setSeason] = useState()
    const navigate = useNavigate()


    // Automatically navigate to the most recent season if it exists
    useEffect(() => {
        const userRef = ref(firebaseDB, `/${user.uid}/`)

        get(userRef).then((snapshot) => {

            if (snapshot.exists()) {
                console.log(snapshot.val())
                
                navigate(`season/${Object.keys(snapshot.val())[Object.keys(snapshot.val()).length - 1]}`)
            }
        })
    },[user])
    
    


    const handleSeasonInputChange = function (e) {
        setSeason((prevState) => (e.target.value))
    }

    const handleSeasonCreate = function (e) {
        e.preventDefault();

        const userSeasonRef = ref(firebaseDB, `/${user.uid}/season${season}`)
            
        get(userSeasonRef).then((snapshot) => {
            if (snapshot.exists()) {
                // If the season already exists, do not create it
                console.log('cannot create new season as it already exists')
                console.log(snapshot.val())
                
            } else {
                // If the season is new, create and navigate to it
                console.log(('entry does not exist; creating...'))
                push(ref(firebaseDB, `/${user.uid}/season${season}/split1/`), {index:0})
                push(ref(firebaseDB, `/${user.uid}/season${season}/split2/`), { index: 0 })
                navigate(`season/season${season}`)
            }
        })
    }

    return (
        <form onSubmit={(e) => { handleSeasonCreate(e) }}>
            <p>FormCreateSeason</p>
            <label htmlFor="inputSeason">Season Number</label>
            <input type="number" id="inputSeason" onChange={handleSeasonInputChange}/>
            <button>Create Season</button>
        </form>
    )
}