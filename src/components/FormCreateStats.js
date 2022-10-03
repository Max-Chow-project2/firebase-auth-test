import { useContext, useState } from "react"

import AppContext from "../contexts/AppContext"

export default function FormCreateStats() {

    const [gameStats, setGameStats] = useState({
        inputRP: 0,
        inputKills: 0,
        inputAssists: 0,
        inputParticipations: 0
    })

    const handleInputChangeGameStats = function (e) {
        console.log(e.target)
        console.log(e.target.value)
        setGameStats((prevState)=>({...prevState, [e.target.id]:e.target.value}))
    }

    const handleSubmitGameStats = function (e) {
        e.preventDefault();
        // TODO: Read the route to get the season and split numbers to create the database reference
        // TODO: Add the entry to firebase
    }

    return (
        <form onSubmit={(e) => { handleSubmitGameStats(e) }}>
            <div>
                <label htmlFor="inputRP">RP</label>
                <input type="number" id="inputRP" onChange={(e) => handleInputChangeGameStats(e)} />
            </div>
            <div>
                <label htmlFor="inputKills">Kills</label>
                <input type="number" id="inputKills" onChange={(e) => handleInputChangeGameStats(e)} />
            </div>
            <div>
                <label htmlFor="inputAssists">Assists</label>
                <input type="number" id="inputAssists" onChange={(e) => handleInputChangeGameStats(e)} />
            </div>
            <div>
                <label htmlFor="inputParticipations">Paricipations</label>
                <input type="number" id="inputParticipations" onChange={(e) => handleInputChangeGameStats(e)} />
            </div>
            <button>Submit</button>
        </form>
    )
}