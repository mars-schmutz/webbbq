import React, { useState } from "react"
import './App.css'

function Button({ display, msg, name, style, url }) {
    const handleClick = () => {
        fetch(`http://${url}/bbbq`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ student: name, message: msg })
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
            <label>Name:</label>
            <input type="text" value={nameInput} onChange={handleNameChange} />
            <label>URL:</label>
            <input type="text" value={urlInput} onChange={handleUrlChange} />
            <div className="response-btns">
                <Button msg={"good"} style="good" display="Good" url={urlInput} name={nameInput} />
                <Button msg={"slow"} style="slow" display="Slow" url={urlInput} name={nameInput} />
                <Button msg={"stop"} style="stop" display="Stop" url={urlInput} name={nameInput} />
            </div>
        </>
    )
}

export default App
