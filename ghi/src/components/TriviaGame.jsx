import React, { useEffect, useState } from "react";
import { format } from "date-fns"
import Button from "@mui/material/Button";
import parse from "html-react-parser"; // coverts html into string
import { useAddScoreMutation } from '../store/api'
import { useGetTokenQuery } from "../store/api";
import Notification from "./Notification";


import wrongAudio from "../assets/audio/wrong.mp3";
import correctAudio from "../assets/audio/correct.mp3";

import "../trivia.css";

//either start screen with category select is in THIS component,
// or a separate component that generates the url for THIS one to use
const API_URL = "https://opentdb.com/api.php?amount=2";

const TriviaGame = () => {
  const { data: tokenData } = useGetTokenQuery();
  const [createFinalScore, result] = useAddScoreMutation()
  const [category, setCategory] = useState('Random')
  const [queryDifficulty, setQueryDifficulty] = useState('Mixed')
  let [data, setData] = useState([]); // -> The whole json response from API Trivia
  let [count, setCount] = useState(0);
  let [score, setScore] = useState(0);
  let [quizStarted, setQuizStarted] = useState(false); // Showing Start quiz if false, showing questions and answers if True
  let [correctAnswer, setCorrectAnswer] = useState("")
  let [question, setQuestion] = useState([]); // The current question
  let [difficulty, setDifficulty] = useState("");
  let [possibleAnswers, setPossibleAnswers] = useState([]) // List of all answers ( correct + incorrect ones) for a specific question
  let [gameEnded, setGameEnded] = useState(false);
  let [isAnswerSelected, setIsAnswerSelected] = useState(false);

  const currentDate = new Date()
  const formattedDate = format(currentDate, "yyyy-MM-dd")

  const scoresDictionary = {
    easy: 1,
    medium: 2,
    hard: 3,
  };

  let correctAudio_obj = new Audio(correctAudio); // get Audio objects
  let wrongAudio_obj = new Audio(wrongAudio);

  const getApiData = async () => {
    const response = await fetch(API_URL);
    const data = await response.json()
    setData(data);
    console.log(data)
  };

  function incrementCount() {
    count = count + 1;
    setCount(count);
  }
  ;

  function addScore() {

    setScore(score + 10 * scoresDictionary[difficulty]);
  };

  const timeout = (delay) => {
    return new Promise((res) => setTimeout(res, delay));
  };

  // const finalScore = ("2022-11-28", category, queryDifficulty, score)

  const getQuestion = () => {
    try {
      setIsAnswerSelected(false);

      setQuestion([]);
      setDifficulty('');
      setCorrectAnswer('');
      setPossibleAnswers([]);

      const {
        question,
        incorrect_answers,
        difficulty,
        correct_answer,
      } = data?.results[count];

      setQuestion(question);
      setDifficulty(difficulty);
      setCorrectAnswer(correct_answer);
      setPossibleAnswers(shuffle([...incorrect_answers, correct_answer]));
    } catch (e) {
      setGameEnded(true);
      createFinalScore({ formattedDate, category, queryDifficulty, score })
      // if (result.isSuccess) {
      //   setGameEnded(true);
      // } else if (result.isError) {
      //   console.log(result.error)
      // }
    }
  };

  const showState = () => {
    console.log("DATA STATE", data);
    console.log("STATE QUESTION: ", question);
    console.log("POSSIBLE ANSWERS:", possibleAnswers);
    console.log("CORRECT ANSWER:", correctAnswer);
    console.log("CURR DIFFICULTY:", difficulty);
  };

  const shuffle = (array) => {
    /* Randomly interchanging the answers order */
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  const startQuiz = () => {
    setQuizStarted(true);
    getQuestion();
  };

  const setQuestionAnswer = (idx, ans) => {
    console.log("ID FROM BTN AND ANSWER: ", idx, ans);
    if (isAnswerSelected) return;
    setIsAnswerSelected(true);
    const _curr_correct_answer = correctAnswer;
    const selectedAnswerButtonEl = document.getElementById(idx);

    if (_curr_correct_answer == ans) {
      selectedAnswerButtonEl.classList.add("correct_btn");
      addScore();
      correctAudio_obj.play();
    } else {
      selectedAnswerButtonEl.classList.add("wrong_btn");
      wrongAudio_obj.play();
    }

    setTimeout(() => {
      selectedAnswerButtonEl.classList.remove("correct_btn");
      selectedAnswerButtonEl.classList.remove("wrong_btn");
    }, 1950);
    // if question timer goes to 0: incrementCount()
    //or if answer is chosen before timer goes to 0:
    incrementCount();
  };

  const onSelectAnswer = async (idx, ans) => {
    if (isAnswerSelected) return;
    setQuestionAnswer(idx, ans);
    await timeout(2000);
    getQuestion();
  };

  useEffect(() => {
    getApiData();
  }, []);

  if (!tokenData) {
    return (
      <div className="container">
        <Notification type="info">Must log in to Play!...</Notification>
      </div>
    )
  } else {
    return (
      //hid the game div until category is selected, and start/play is pressed
      <div className="App">
        {!gameEnded ? (
          <div className="ended game">
            {quizStarted ? (
              <div className="container">
                <Button className="font_large" variant="contained">
                  {" "}
                  {parse(question)}{" "}
                </Button>
                <div className="div_possible_answers">
                  {possibleAnswers.map((ans, idx) => {
                    // for answer in response_answer make button
                    return (
                      <div className="possbile_answer_div" key={btoa(ans) + idx}>
                        <Button
                          className="possbile_answer font_large"
                          onClick={() => onSelectAnswer(idx, ans)}
                          id={idx}
                          variant="contained"
                          keyprop={idx}
                        >
                          {" "}
                          {parse(ans)}{" "}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <Button
                className="font_large"
                variant="contained"
                onClick={startQuiz}
              >
                {" "}
                Start Quiz{" "}
              </Button>
            )}
            <Button
              className="font_large"
              variant="contained"
              onClick={showState}
            >
              {" "}
              PRINT STATE{" "}
            </Button>
            <div className="score_container">
              <Button className="font_large score_btn" variant="contained">
                {" "}
                {score}{" "}
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <h1> ENDED GAME! Your final score is: {score} !</h1>
          </div>
        )}
      </div>
    );
  }
}

export default TriviaGame;