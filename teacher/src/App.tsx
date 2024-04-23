import React, { useState, useEffect } from "react"
import './App.css'

function UpdateWindow({ url }) {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        //const resp = await fetch("http://localhost:8000/teacher")
        const _resp = await fetch(`${url}/teacher`)
        const resp = await fetch("https://webbbq.onrender.com/teacher")
        const data = await resp.json()
        setUpdates(data.updates.reverse())
      } catch (err) {
        console.error(`Error fetching updates: ${err}`)
      }
    }

    fetchUpdates();

    const timer = setInterval(fetchUpdates, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleReset = () => {
    fetch("https://webbbq.onrender.com/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
    setUpdates([])
  }

  return (
    <div className="updates">
      <h2>Updates</h2>
      <button onClick={handleReset}>Reset</button>
      <ul>
        {updates.map((update, idx) => (
          <li key={idx}>{update.student}: {update.message}</li>
        ))}
      </ul>
    </div>
  )
}

function App() {
  const [urlInput, setUrlInput] = useState("");

  const handleUrlChange = (event) => {
    setUrlInput(event.target.value);
  }

  return (
    <>
      <UpdateWindow url={urlInput} />
    </>
  )
}

export default App
