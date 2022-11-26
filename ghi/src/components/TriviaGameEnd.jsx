import React from 'react'
import { useNavigate } from 'react-router-dom';

const TriviaGameEnd = () => {
  const navigate = useNavigate()

  const playAgain = () => {
    setTimeout(navigate, 2000, ("/trivia/play"))
  }

  return (
    <div>
    <button onClick={playAgain}>Play Again?</button>
    </div>
  )
}

export default TriviaGameEnd
