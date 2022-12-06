import { ref, set } from "firebase/database";
import { useState, useContext } from "react";
import AppContext from "../contexts/AppContext";
import FormCreateStats from "./FormCreateStats";

export default function FormSelectSplit({ userGames, selectedSeason }) {

	const { firebaseDB, user } = useContext(AppContext);

	const [split, setSplit] = useState("split1");

	const handleChangeSplit = function (e) {
		console.log(e.target.value);
		setSplit((prevState) => e.target.value);
		// TODO
	}
	

	const handleRemoveGame = function (gameInfoKey) {

		let newSplitGamesArray = Object.entries(userGames[selectedSeason][split]);
		const newGamesObject = {}

		// Filter out the game to delete
		let filteredGamesArray = newSplitGamesArray.filter((game) => {
			return game[0] !== gameInfoKey
		})

		// Create the new object to update the game indices
		filteredGamesArray.forEach((game, newIndex) => {
			newGamesObject[game[0]] = {
				index: newIndex,
				gameStats: newIndex ? game[1].gameStats : null
			}
		})

		// Update the database
		set(ref(firebaseDB, `/${user.uid}/${selectedSeason}/${split}/`), newGamesObject)
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
			<ol>
				<FormCreateStats userGames={userGames} selectedSeason={selectedSeason} split={split} />

				{/* TODO: Put the thing below in a component */}
				{/* TODO: Add an edit button */}
				{userGames[selectedSeason] ? 
					Object.keys(userGames[selectedSeason][split])
						.sort((a, b) =>
							userGames[selectedSeason][split][a].index - userGames[selectedSeason][split][b].index
						).map((gameInfoKey) => {

							const gameObject = userGames[selectedSeason][split][gameInfoKey]

							return (
								gameObject.index ?
									<li key={gameInfoKey}>
										<div>
											<p>{gameInfoKey}</p>
											<p>RP: {gameObject.gameStats.rp}</p>
											<p>Kills: {gameObject.gameStats.kills}</p>
											<p>Assists: {gameObject.gameStats.assists}</p>
											<p>Participations: {gameObject.gameStats.participations}</p>
											<button onClick={() => handleRemoveGame(gameInfoKey)}> Delete </button>
										</div>
									</li> : null
							)
					}) : null
				}
			</ol>
			
		</div>
	)
}