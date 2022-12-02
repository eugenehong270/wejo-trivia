import React, { useState, useRef } from "react";
import { format } from "date-fns";
import Button from "@mui/material/Button";
import parse from "html-react-parser";
import { useAddScoreMutation, useGetTokenQuery } from '../store/api';
import { useGetCategoriesQuery, useGetTriviaQuestionsQuery } from "../store/triviaApi";
import Notification from "./Notification";
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import wrongAudio from "../assets/audio/wrong.mp3";
import correctAudio from "../assets/audio/correct.mp3";
import "../trivia.css";
import Soundtrack from "./Soundtrack";

const TriviaGame = () => {

  // state for user game api

  const [category, setCategory] = useState('')
  const [createFinalScore] = useAddScoreMutation('')
  const [queryDifficulty, setQueryDifficulty] = useState('')
  const [difficulty, setDifficulty] = useState('');

  const { data: tokenData } = useGetTokenQuery();
  const { data: questionData } = useGetTriviaQuestionsQuery({ category, difficulty: queryDifficulty });
  const { data: categoryData } = useGetCategoriesQuery();

  // game play state
  const [count, setCount] = useState(0);
  const [score, setScore] = useState(0);
  const [maximumPossibleScore, setMaximumPossibleScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false); // Showing Start quiz if false, showing questions and answers if True
  const [correctAnswer, setCorrectAnswer] = useState("")
  const [question, setQuestion] = useState([]); // The current question
  const [possibleAnswers, setPossibleAnswers] = useState([]) // List of all answers ( correct + incorrect ones) for a specific question
  const [gameEnded, setGameEnded] = useState(false);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);

  const categories_list = categoryData?.trivia_categories
  const difficulty_list = ['easy', 'medium', 'hard', 'Any']

  //timer state
  const Ref = useRef(null);
  const [timer, setTimer] = useState('00:15');

  //timer functionality
  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return {
      total, minutes, seconds
    };
  }

  const startTimer = (e) => {
    let { total, minutes, seconds }
      = getTimeRemaining(e);
    if (total === 0) {
      incrementCount();
      setTimeout(onClickStart(), 3000)
      getQuestion();
    }
    if (total >= 0) {
      setTimer(
        (minutes > 9 ? minutes : '0' + minutes) + ':'
        + (seconds > 9 ? seconds : '0' + seconds)
      )
    }
  }

  const clearTimer = (e) => {
    setTimer('00:15');
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 500)
    Ref.current = id;
  }

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 15);
    return deadline;
  }

  const onClickStart = () => {
    clearTimer(getDeadTime());
  }

  const currentDate = new Date()
  const formattedDate = format(currentDate, "yyyy-MM-dd")

  const scoresDictionary = {
    easy: 1,
    medium: 2,
    hard: 3,
  };

  const correctAudio_obj = new Audio(correctAudio); // get Audio objects
  const wrongAudio_obj = new Audio(wrongAudio);

  function incrementCount() {
    setCount(count + 1)
  };

  const addScore = () => {
    setScore(score + 10 * scoresDictionary[difficulty]);
    setMaximumPossibleScore(score + 10 * scoresDictionary[difficulty]);
  };

  const timeout = (delay) => {
    return new Promise((res) => setTimeout(res, delay));
  };

  const showState = () => {
    console.log("STATE QUESTION: ", question);
    console.log("POSSIBLE ANSWERS:", possibleAnswers);
    console.log("CORRECT ANSWER:", correctAnswer);
    console.log("CURR CATEGORY:", category)
    console.log("CURR DIFFICULTY:", difficulty);
  };

  const shuffle = (array) => {
    /* Randomly interchanging the answers order */
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  const getQuestion = () => {
    try {
      setIsAnswerSelected(false);
      setQuestion([]);
      setDifficulty('');
      setCorrectAnswer('');
      setPossibleAnswers([]);

      let currQuestion = questionData?.results[count]

      setQuestion(currQuestion.question);
      setDifficulty(currQuestion.difficulty);
      setCorrectAnswer(currQuestion.correct_answer);
      setPossibleAnswers(shuffle([...currQuestion.incorrect_answers, currQuestion.correct_answer]));
      onClickStart();
    } catch (e) {
      console.log(e)
      setGameEnded(true);
      createFinalScore({ formattedDate, category, queryDifficulty, score })
    }
  };

  const getCategoryValue = (e) => {
    setCategory(e.target.value);
    console.log(category);
  };

  const getDifficultyValue = (e) => {
    setQueryDifficulty(e.target.value);
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
    incrementCount();
  };

  const onSelectAnswer = async (idx, ans) => {
    if (isAnswerSelected) return;
    setQuestionAnswer(idx, ans);
    await timeout(2000);
    getQuestion();
  };

  const startQuiz = async () => {
    setQuizStarted(true);
    getQuestion()
    onClickStart();
    incrementCount();
  };

  if (!tokenData) {
    return (
      <div className="container">
        <Notification type="info">Must log in to Play!...</Notification>
      </div>
    )
  } else {
    return (
      //hid the game div until category is selected, and start/play is pressed
      <>
        <div className="d-flex align-items-center">
          {!gameEnded ? (
            <div className="ended game">
              {quizStarted ? (
                <div className="container d-flex">
                  <h2>{timer}</h2>
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
                <div>
                  <div className="categoryform">
                    <FormControl fullWidth>
                      <InputLabel id="selectLabel" className="selectlabel">Select category</InputLabel>
                      <Select
                        labelId="selectLabel"
                        id="demo-simple-select"
                        label="Category"
                        value={category}
                        onChange={async (e) => getCategoryValue(e)}
                        defaultValue={category}
                      >
                        {categories_list?.map((c) => {
                          return (
                            <MenuItem value={c.id}>{c.name}</MenuItem>
                          )
                        })}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel id="selectLabel" className="selectlabel">Select difficulty</InputLabel>
                      <Select
                        labelId="selectLabel"
                        id="demo-simple-select"
                        label="Difficulty"
                        value={difficulty}
                        onChange={async (e) => getDifficultyValue(e)}
                        defaultValue={difficulty}
                      >
                        {difficulty_list.map((difficulty) => {
                          // for answer in response_answer make button
                          return (
                            <MenuItem value={difficulty}>{difficulty}</MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </div>

                  <Button
                    className="font_large"
                    variant="contained"
                    onClick={async () => await startQuiz()}
                  >
                    {" "}
                    Start Quiz{" "}
                  </Button>

                </div>
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
              <h1> ENDED GAME! Maximum score is: {maximumPossibleScore} !</h1>
            </div>
          )
          }
        </div >
        <Soundtrack/>
      </>
    );
  }
}

export default TriviaGame;
