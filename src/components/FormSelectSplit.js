import { useState } from "react"

export default function FormSelectSplit() {

    const [split, setSplit] = useState("split1")

    const handleChangeSplit = function (e) {
        console.log(e.target.value)
        setSplit((prevState) => e.target.value)
        // TODO
    }
    
    return (
        <form>
            <legend>Split</legend>
            <label htmlFor="split1">Split 1: </label>
            <input type="radio" name="split" id="split1" value="split1" onChange={(e) => { handleChangeSplit(e) }} checked={split === "split1"} />
            <label htmlFor="split2">Split 2: </label>
            <input type="radio" name="split" id="split2" value="split2" onChange={(e) => { handleChangeSplit(e) }} checked={split === "split2"} />
        </form>
    )
}