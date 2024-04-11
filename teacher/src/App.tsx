import React, { useState, useEffect } from "react"
import './App.css'

function UpdateWindow() {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const resp = await fetch("http://localhost:8000/teacher")
        const data = await resp.json()
        setUpdates(data.updates)
      } catch (err) {
        console.error(`Error fetching updates: ${err}`)
      }
    }

    fetchUpdates();

    const timer = setInterval(fetchUpdates, 5000)

    return () => clearInterval(timer)
  }, [])

  const handleReset = () => {
    fetch("http://localhost:8000/reset", {
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
      <ul>
        {updates.map((update, idx) => (
          <li key={idx}>{update.student}: {update.message}</li>
        ))}
      </ul>
      <button onClick={handleReset}>Reset</button>
    </div>
  )
}

function App() {

  return (
    <>
      <UpdateWindow />
    </>
  )
}

export default App
