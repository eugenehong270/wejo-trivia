import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import axios from "axios"; // responsible for http requests, fetching data
import './trivia.css';
import correct_audio from '../assets/audio/correct.mp3';
import wrong_audio from '../assets/audio/wrong.mp3';
import parse from 'html-react-parser'; // coverts html into string

function App() {
  let [data, setData] = useState([]); // -> The whole json response from API Trivia
  let [count, setCount] = useState(0);
  let [score, setScore] = useState(0);
  let [quizStarted, setQuizStarted] = useState(false); // Showing Start quiz if false, showing questions and answers if True
  let [correctAnswer, setCorrectAnswer] = useState("")
  let [question, setQuestion] = useState([]); // The current question
  let [difficulty, setDifficulty] = useState("");
  let [possible_answers, setPossibleAnswers] = useState([]) // List of all answers ( correct + incorrect ones) for a specific question
  let [gameEnded, setGameEnded] = useState(false);
  let [isAnswerSelected, setIsAnswerSelected] = useState(false);

  let scores_dictionary = {
    "easy": 1,
    "medium": 2,
    "hard": 3
  }


  let correct_audio_obj = new Audio(correct_audio); // get Audio objects
  let wrong_audio_obj = new Audio(wrong_audio);
  async function getApiData() {
    let api_link = "https://opentdb.com/api.php?amount=10"; // get all json data
    await axios.
      get(api_link).then((response) => {
        setData(response.data);
      });
  };

  useEffect(() => {
    getApiData();
  },
    []);

  function incrementCount() {
    count = count + 1;
    setCount(count);
  }

  function addScore() {
    let curr_difficulty = scores_dictionary[difficulty];
    score = score + 10 * curr_difficulty;
    setScore(score);
  }

  function timeout(delay: number) {
    return new Promise(res => setTimeout(res, delay));
  }


  function showState() {
    console.log("DATA STATE", data);
    console.log("STATE QUESTION: ", question)
    console.log("POSSIBLE ANSWWERS:", possible_answers)
    console.log("CORRECT ANSWWER:", correctAnswer)
    console.log("CURR DIFFICULTY:", difficulty)
  };

  let shuffle = (array) => {
    /* Randomly interchanging the answers order */
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  async function getQuestion() {
    try {
      setIsAnswerSelected(false)
      let triviaPart = data['results'][count] // the current json of question, answeers, difficulty, etc..
      let _curr_qestion = triviaPart['question']
      let _possible_answers = triviaPart['incorrect_answers']
      let _difficulty = triviaPart['difficulty']
      let _coorect_answer = triviaPart['correct_answer']

      _possible_answers.push(_coorect_answer);
      let shuffledAnswers = shuffle(_possible_answers);

      setQuestion(_curr_qestion)
      setDifficulty(_difficulty);
      setCorrectAnswer(_coorect_answer);
      setPossibleAnswers(shuffledAnswers);
    }
    catch (e) {
      console.log("Game ended");
      setGameEnded(true);
    }
  }

  function startQuiz() {
    setQuizStarted(true);
    getQuestion();
  }

  async function setQuestionAnswer(idx, ans) {
    console.log("ID FROM BTN AND ANSWER: ", idx, ans);
    if (isAnswerSelected) return;
    setIsAnswerSelected(true);
    const _curr_correct_answer = correctAnswer;
    let curr_btn = document.getElementById(idx);

    if (_curr_correct_answer == ans) {
      curr_btn.classList.add('correct_btn');
      addScore();
      correct_audio_obj.play();
    }
    else {
      curr_btn.classList.add('wrong_btn');
      wrong_audio_obj.play();
    }

    setTimeout(() => {
      curr_btn.classList.remove('correct_btn');
      curr_btn.classList.remove('wrong_btn');
    }, 1950)

    incrementCount();
  }

  return (
    <div className="App">

      {!gameEnded ?
        <div className="ended game">
          {quizStarted ?
            <div className="container">
              <Button className="font_large" variant="contained"> {parse(question)} </Button>
              <div className="div_possible_answers">
                {possible_answers.map(function (ans, idx) { // for answer in response_answer make button
                  return (
                    <div className="possbile_answer_div" key={btoa(ans) + idx}>
                      <Button className="possbile_answer font_large" onClick={async () => {
                        if (isAnswerSelected) return;
                        setQuestionAnswer(idx, ans)
                        await timeout(2000)
                        getQuestion();
                      }}
                        id={idx}
                        variant="contained" keyprop={idx}> {parse(ans)} </Button>
                    </div>
                  )
                })}
              </div>
            </div>
            :

            <Button className="font_large" variant="contained" onClick={startQuiz}> Start Quiz </Button>
          }
          <Button className="font_large" variant="contained" onClick={showState}> PRINT STATE  </Button>
          <div className="score_container">
            <Button className="font_large score_btn" variant="contained"> {score} </Button>
          </div>

        </div>
        :
        <div>
          <h1> ENDED GAME! Your final score is: {score} !</h1>
        </div>
      }
    </div>
  );
}

export default App;
