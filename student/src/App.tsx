import React, { useState } from "react"
import './App.css'

function Button({ display, msg, name, style, url }) {
    const legend: { [key: string]: string } = {
        "good": "I'm good",
        "slow": "Please slow down",
        "stop": "Please explain that"
    }

    const handleClick = () => {
        fetch(`http://${url}/bbbq`, {
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
    const [urlInput, setUrlInput] = useState("");
    const [nameInput, setNameInput] = useState("");

    const handleUrlChange = (event) => {
        setUrlInput(event.target.value);
    }

    const handleNameChange = (event) => {
        setNameInput(event.target.value);
    }

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
                <Button msg={"good"} style="good" display="Good" url={urlInput} name={nameInput} />
                <Button msg={"slow"} style="slow" display="Slow" url={urlInput} name={nameInput} />
                <Button msg={"stop"} style="stop" display="Stop" url={urlInput} name={nameInput} />
            </div>
        </>
    )
}

export default App
