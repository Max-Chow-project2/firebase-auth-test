import { useContext, useState } from "react"
import { ref, push } from "firebase/database"
import AppContext from "../contexts/AppContext"

export default function FormCreateStats({userGames, selectedSeason, split}) {

    const { firebaseDB, user } = useContext(AppContext);

    const [gameStats, setGameStats] = useState({
        rp: 0,
        kills: 0,
        assists: 0,
        participations: 0
    })

    const handleInputChangeGameStats = function (e) {
        console.log(e.target);
        console.log(e.target.value);
        setGameStats((prevState)=>({...prevState, [e.target.id]:e.target.value}));
    }

    const handleSubmitGameStats = function (e) {
        e.preventDefault();

        push(ref(firebaseDB, `/${user.uid}/${selectedSeason}/${split}/`), {
            index: Object.keys(userGames[selectedSeason][split]).length,
            gameStats
        });

        setGameStats({
            rp: 0,
            kills: 0,
            assists: 0,
            participations: 0
        })
    }

    return (
        <form onSubmit={(e) => { handleSubmitGameStats(e) }}>
            <div>
                <label htmlFor="inputRP">RP</label>
                <input type="number" id="rp" onChange={(e) => handleInputChangeGameStats(e)} value={gameStats.rp} required/>
            </div>
            <div>
                <label htmlFor="inputKills">Kills</label>
                <input type="number" id="kills" onChange={(e) => handleInputChangeGameStats(e)} value={gameStats.kills} required />
            </div>
            <div>
                <label htmlFor="inputAssists">Assists</label>
                <input type="number" id="assists" onChange={(e) => handleInputChangeGameStats(e)} value={gameStats.assists} required />
            </div>
            <div>
                <label htmlFor="inputParticipations">Paricipations</label>
                <input type="number" id="participations" onChange={(e) => handleInputChangeGameStats(e)} value={gameStats.participations} required />
            </div>
            <button>Submit</button>
        </form>
    )
}