import {ref, get, onValue} from "firebase/database"
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppContext from "../contexts/AppContext";

// components
import FormSelectSplit from "./FormSelectSplit";

export default function FormDisplaySeason() {

	const { firebaseDB, user } = useContext(AppContext);
	const [seasons, setSeasons] = useState([]);

	// user selected season
	const [selectedSeason, setSelectedSeason] = useState('');
	//all user game history
	const [userGames, setUserGames] = useState({});

	const navigate = useNavigate();

	// Get url seasonID
	const { seasonID } = useParams()

	// useEffect to populate season select dropdown
	useEffect(() => {
		const userDBRef = ref(firebaseDB, `/${user?.uid}/`);
		
		onValue(userDBRef, (response) => {
			if (response.exists()) {
				setSeasons((prevState) => Object.keys(response.val()));
				console.log(response.val());
				setUserGames(response.val());
			}
		})

	}, [user]) //genius

	const handleSelectSeason = function (e) {
		navigate(`../../season/${e.target.value}`)
		setSelectedSeason(e.target.value);
	}

	// Takes last 3 characters and removes leading zeros
	// e.g. "season012" => "12"
	const getSeasonNumber = (season) => {
		return season.slice(-3).replace(/^0+/, '') //TODO: replace .slice(-3) with removing leading string "season"
	}
	
	
	return (
		<div>
			<form>
				<p>FormDisplaySeason</p>
				<select onChange={(e) => { handleSelectSeason(e) }} id="selectSeason" value={seasonID}>

					<option value='' defaultValue >Select Season</option>

					{seasons.map((item, index) => {
						return (
							<option key={item} value={item}>{`Season ${getSeasonNumber(item)}`}</option>
						)                    
					})}
				</select>
			</form>

			{selectedSeason ? 
			<FormSelectSplit userGames={userGames} selectedSeason={selectedSeason}/> 
			: null
			}
		</div>

    )
}