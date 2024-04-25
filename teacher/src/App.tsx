import React, { useState, useEffect } from "react"
import './App.css'

function UpdateWindow({ updates }) {

  return (
    <div className="updates">
      <h2>Updates</h2>
      <ul>
        {updates.map((update, idx) => (
          <li key={idx}>{update.student}: {update.message}</li>
        ))}
      </ul>
    </div>
  )
}

function QuestionWindow({ questions }) {

  return (
    <div className="questions">
      <h2>Questions</h2>
      <ul>
        {questions.map((question, idx) => (
          <li key={idx}>{question.student}: {question.question}</li>
        ))}
      </ul>
    </div>
  )
}

function App() {
  const [urlInput, setUrlInput] = useState("");
  const [passwdInput, setPasswdInput] = useState("");
  const [updates, setUpdates] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        //const _resp = await fetch(`${url}/teacher`)
        const headers = {
          "X-TotallySecure": passwdInput
        }
        const resp = await fetch("http://localhost:8000/teacher", {
          method: "GET",
          headers: headers
        })
        const data = await resp.json()
        setUpdates(data.updates.reverse())
        setQuestions(data.questions.reverse())
      } catch (err) {
        console.error(`Error fetching updates: ${err}`)
      }
    }

    fetchUpdates();

    const timer = setInterval(fetchUpdates, 100)

    return () => clearInterval(timer)
  }, [passwdInput])

  const handleReset = () => {
    fetch("http://localhost:8000/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-TotallySecure": passwdInput
      }
    })
    setUpdates([])
  }

  const handleUrlChange = (event) => {
    setUrlInput(event.target.value);
  }

  const handlePasswdChange = (event) => {
    setPasswdInput(event.target.value);
  }

  return (
    <>
      <input type="password" value={passwdInput} onChange={handlePasswdChange} />
      <button onClick={handleReset} >Reset</button>
      <UpdateWindow updates={updates} />
      <QuestionWindow questions={questions} />
    </>
  )
}

export default App
