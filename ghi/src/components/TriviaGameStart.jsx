import React from 'react'
import { useNavigate } from 'react-router-dom'

const TriviaGameStart = () => {
  const navigate = useNavigate()
  const startGame = () =>
    setTimeout(navigate, 2000, "/trivia/play")
  return (
    <div>
    <button onClick={startGame}>Play</button>
    </div>
  )
}

export default TriviaGameStart
