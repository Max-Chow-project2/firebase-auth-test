import {ref, get, onValue} from "firebase/database"
import { useState, useEffect, useContext } from "react";
import AppContext from "../contexts/AppContext";

// components
import FormSelectSplit from "./FormSelectSplit";

export default function FormDisplaySeason() {

	const { firebaseDB, user } = useContext(AppContext);
	const [season, setSeason] = useState([]);

	// user selected season
	const [selectedSeason, setSelectedSeason] = useState('');
	//all user game history
	const [userGames, setUserGames] = useState({});

	useEffect(() => {

		const userDBRef = ref(firebaseDB, `/${user?.uid}/`);
		
		onValue(userDBRef, (response) => {
			if (response.exists()) {
				setSeason((prevState) => Object.keys(response.val()));
				console.log(response.val());
				setUserGames(response.val());
			}
		})

	}, [])

    const handleSelectSeason = function (e) {
      setSelectedSeason(e.target.value);
    }

    return (
			<form>
				<p>FormDisplaySeason</p>
				<select onChange={(e) => { handleSelectSeason(e) }} id="selectSeason">

					<option value='' defaultValue>Select Season</option>

					{season.map((item, index) => {
						return (
							<option key={`season${index}`} value={item}>{`Season ${index + 1}`}</option>
						)                    
					})}
				</select>

				{selectedSeason ? 
				<FormSelectSplit userGames={userGames} selectedSeason={selectedSeason}/> 
				: null
				}

			</form>
    )
}