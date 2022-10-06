import { ref, onValue } from "firebase/database";
import { useState, useContext } from "react";
import AppContext from "../contexts/AppContext";

export default function FormSelectSplit({ userGames, selectedSeason }) {

	const { firebaseDB, user } = useContext(AppContext);
	const [split, setSplit] = useState("split1");

	const handleChangeSplit = function (e) {
		console.log(e.target.value);
		setSplit((prevState) => e.target.value);
		// TODO
	}
	
	return (
		<div>
			<form>
				<legend>Split</legend>
				<label htmlFor="split1">Split 1: </label>
				<input type="radio" name="split" id="split1" value="split1" onChange={(e) => { handleChangeSplit(e) }} checked={split === "split1"} />
				<label htmlFor="split2">Split 2: </label>
				<input type="radio" name="split" id="split2" value="split2" onChange={(e) => { handleChangeSplit(e) }} checked={split === "split2"} />
			</form>

			{/* map over database's split match history, used Object.keys method since our db structure is an object */}
			<ul>
				{Object.keys(userGames[selectedSeason][split]).map((gameInfoKey) => {
					return (
						<li key={gameInfoKey}>{gameInfoKey}: whatever match info here once we have databse</li>
					)
				})}
			</ul>
			
		</div>
	)
}