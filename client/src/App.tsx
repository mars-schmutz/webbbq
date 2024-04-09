import React, { useState } from "react"
import './App.css'

function Button({ display, msg, style, url }) {
    const handleClick = () => {
        fetch(`${url}/bbbq`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: msg })
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

    const handleUrlChange = (event) => {
        setUrlInput(event.target.value);
    }

    return (
        <>
            <input type="text" value={urlInput} onChange={handleUrlChange} />
            <div className="response-btns">
                <Button msg={"good"} style="good" display="Good" url={urlInput} />
                <Button msg={"slow"} style="slow" display="Slow" url={urlInput} />
                <Button msg={"stop"} style="stop" display="Stop" url={urlInput} />
            </div>
        </>
    )
}

export default App
