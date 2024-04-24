import React, { useState, useEffect } from "react"
import './App.css'

function UpdateWindow({ url, passwd }) {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        //const _resp = await fetch(`${url}/teacher`)
        const headers = {
          "X-TotallySecure": passwd
        }
        const resp = await fetch("https://webbbq.onrender.com/teacher", {
          method: "GET",
          headers: headers
        })
        const data = await resp.json()
        setUpdates(data.updates.reverse())
      } catch (err) {
        console.error(`Error fetching updates: ${err}`)
      }
    }

    fetchUpdates();

    const timer = setInterval(fetchUpdates, 100)

    return () => clearInterval(timer)
  }, [passwd])

  const handleReset = () => {
    fetch("https://webbbq.onrender.com/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-TotallySecure": passwd
      }
    })
    console.log(`passwd: ${passwd}`);
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
  const [passwdInput, setPasswdInput] = useState("");

  const handleUrlChange = (event) => {
    setUrlInput(event.target.value);
  }

  const handlePasswdChange = (event) => {
    setPasswdInput(event.target.value);
  }

  return (
    <>
      <input type="password" value={passwdInput} onChange={handlePasswdChange} />
      <UpdateWindow url={urlInput} passwd={passwdInput} />
    </>
  )
}

export default App
