import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import './App.css'

import { daltonize } from "daltonize"

function Button({ display, msg, style, url }) {
    const legend: { [key: string]: string } = {
        "good": "I'm good",
        "slow": "Please slow down",
        "stop": "Please explain that"
    }

    const name = useSelector(state => state.name)

    const handleClick = () => {
        fetch(`${url}/bbbq`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ student: name, message: legend[msg] })
        })
    }

    return (
        <button
            className={`button ${style}`}
            onClick={handleClick}
        >
            {display}
        </button>
    )
}

function App() {
    const [urlInput, setUrlInput] = useState("https://webbbq.onrender.com");
    const [nameInput, setNameInput] = useState("");

    const handleUrlChange = (event) => {
        setUrlInput(event.target.value);
    }

    const dispatch = useDispatch()
    const handleNameChange = (event) => {
        const newName = event.target.value
        setNameInput(newName);
        dispatch({ type: "SET", payload: newName });
    }

    let d = daltonize([33, 255, 85], "protanope")

    return (
        <>
            <div className="inputs">
                <div>
                    <label>Name:</label>
                    <input type="text" value={nameInput} onChange={handleNameChange} />
                </div>
                <div>
                    <label>URL:</label>
                    <input type="text" value={urlInput} onChange={handleUrlChange} />
                </div>
            </div>
            <div className="response-btns">
                <Button msg={"good"} style="good" display="Good" url={urlInput} />
                <Button msg={"slow"} style="slow" display="Slow" url={urlInput} />
                <Button msg={"stop"} style="stop" display="Stop" url={urlInput} />
            </div>
        </>
    )
}

export default App
