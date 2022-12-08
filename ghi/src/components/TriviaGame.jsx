import React, { useState, useRef } from "react";
import { format } from "date-fns";
import Button from "@mui/material/Button";
import parse from "html-react-parser";
import { useAddScoreMutation, useGetTokenQuery } from '../store/api';
import { useGetCategoriesQuery, useGetTriviaQuestionsQuery } from "../store/triviaApi";
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import wrongAudio from "../assets/audio/wrong.mp3";
import correctAudio from "../assets/audio/correct.mp3";
import "../style/trivia.css";
import LoginModal from "./LoginModal";


const TriviaGame = () => {

  // state for user game api

  const [categoryID, setCategoryID] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [createFinalScore] = useAddScoreMutation('')
  const [queryDifficulty, setQueryDifficulty] = useState('')
  const [difficulty, setDifficulty] = useState('');

  const { data: tokenData } = useGetTokenQuery();
  const { data: questionData } = useGetTriviaQuestionsQuery({ category: categoryID, difficulty: queryDifficulty });
  const { data: categoryData } = useGetCategoriesQuery();

  // game play state
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false); // Showing Start quiz if false, showing questions and answers if True
  const [correctAnswer, setCorrectAnswer] = useState("")
  const [question, setQuestion] = useState([]); // The current question
  const [possibleAnswers, setPossibleAnswers] = useState([]) // List of all answers ( correct + incorrect ones) for a specific question
  const [gameEnded, setGameEnded] = useState(false);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);

  const [count, setCount] = useState(0)
  let tempCount = 0

  const categories_list = categoryData?.trivia_categories
  const difficulties = { 'easy': 'Easy', 'medium': 'Medium', 'hard': 'Hard' }

  //timer state
  const Ref = useRef(null);
  const [timer, setTimer] = useState('00:10');

  //timer functionality
  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return {
      total, minutes, seconds
    };
  }

  const startTimer = async (e) => {
    let { total, minutes, seconds }
      = getTimeRemaining(e);
    if (total === 0) {
      if (count || tempCount === 9) {
        return
      }
      tempCount = tempCount + 1
      getQuestion(tempCount);
    }
    if (total >= 0) {
      setTimer(
        (minutes > 9 ? minutes : '0' + minutes) + ':'
        + (seconds > 9 ? seconds : '0' + seconds)
      )
    }
  }


  const clearTimer = (e) => {
    setTimer('00:10');
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000)
    Ref.current = id;
  }

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 10);
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

  const correctAudio_obj = new Audio(correctAudio);
  const wrongAudio_obj = new Audio(wrongAudio);

  const incrementCount = () => {
    setCount(prev => prev + 1)
    tempCount = count
  };

  const addScore = () => {
    setScore(score + 10 * scoresDictionary[difficulty]);
  };

  const timeout = (delay) => {
    return new Promise((res) => setTimeout(res, delay));
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

  const getQuestion = (currCount) => {
    if (tempCount > count) {
      setCount(tempCount + 1)
    }
    try {
      setIsAnswerSelected(false);
      setQuestion([]);
      setDifficulty('');
      setCorrectAnswer('');
      setPossibleAnswers([]);

      let currQuestion = questionData?.results[currCount]

      setQuestion(currQuestion.question);
      setDifficulty(currQuestion.difficulty);
      setCorrectAnswer(currQuestion.correct_answer);
      setPossibleAnswers(shuffle([...currQuestion.incorrect_answers, currQuestion.correct_answer]));
      onClickStart();
    } catch (e) {
      setGameEnded(true)
      sendFinalScore(categoryName, queryDifficulty)
    };
  }

  const sendFinalScore = async (currCat, currDiff) => {
    if (currCat === '') {
      setCategoryName('Mixed')
    }
    if (currDiff === '') {
      setQueryDifficulty('Mixed')
    } else {
      setQueryDifficulty(difficulties[queryDifficulty])
    }
    await createFinalScore({ formattedDate, categoryName, queryDifficulty, score })
    console.log('done');
  }


  const startQuiz = () => {
    setQuizStarted(true);
    if (categoryID !== '') {
      setCategoryName(categories_list[categoryID - 9]['name'])
    } else {
      setCategoryName('Mixed')
    }
    if (queryDifficulty === '') {
      setQueryDifficulty('Mixed')
    }
    getQuestion(count);
    incrementCount();
  };

  const getCategoryValue = (e) => {
    setCategoryID(e.target.value);
  };

  const getDifficultyValue = (e) => {
    setQueryDifficulty(e.target.value);
    setDifficulty(e.target.value);
  };

  const setQuestionAnswer = (idx, ans) => {
    console.log("ID FROM BTN AND ANSWER: ", idx, ans);
    if (isAnswerSelected) return;
    setIsAnswerSelected(true);
    const _curr_correct_answer = correctAnswer;
    const selectedAnswerButtonEl = document.getElementById(idx);

    if (_curr_correct_answer === ans) {
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
    getQuestion(count);
  };

  const restartGame = () => {
    setScore(0);
    setCount(0)
    tempCount = 0
    setCategoryID('')
    setCategoryName('')
    setQueryDifficulty('')
    setGameEnded(false)
    setQuizStarted(false)
  }

  if (!tokenData) {
    return (
      <>
        <div style={{ display: 'grid', justifyContent: 'center' }} className="container">
          <h1 style={{ color: 'white', paddingLeft: '50px', marginTop: '20px' }} className="display-3">Must be logged in to play!</h1>
          <LoginModal />
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className="d-flex align-items-center">
          {!gameEnded ? (
            <div className="ended game">
              {quizStarted ? (
                <div className="container d-flex">
                  <h4 className="timerStyle">{timer}</h4>
                  <h3 className="questionStyle" variant="contained">
                    {parse(question)}
                  </h3>
                  <div className="div_possible_answers">
                    {possibleAnswers?.map((ans, idx) => {
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
                  <div>
                    <h2> Select game options</h2>
                  </div>

                  <div className="categoryform">
                    <FormControl fullWidth>
                      <InputLabel id="selectCategoryLabel" className="selectlabel">Category:</InputLabel>
                      <Select
                        labelId="selectCategoryLabel"
                        id="demo-simple-selectCat"
                        label="Category"
                        value={categoryID}
                        onChange={async (e) => getCategoryValue(e)}
                        defaultValue={categoryID}
                      >
                        {categories_list?.map((c) => {
                          return (
                            <MenuItem key={c.id} value={c.id} label={c.name}>{c.name}</MenuItem>
                          )
                        })}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel id="selectDiffLabel" className="selectlabel">Difficulty:</InputLabel>
                      <Select
                        labelId="selectDiffLabel"
                        id="demo-simple-selectDif"
                        label="Difficulty"
                        value={queryDifficulty}
                        onChange={async (e) => getDifficultyValue(e)}
                        defaultValue={queryDifficulty}
                      >
                        <MenuItem value={'easy'}>Easy</MenuItem>
                        <MenuItem value={'medium'}>Medium</MenuItem>
                        <MenuItem value={'hard'}>Hard</MenuItem>
                        <MenuItem value={' '}>Mixed</MenuItem>
                      </Select>
                    </FormControl>
                  </div>

                  <div className="holder">
                    <Button
                      className="holder"
                      variant="contained"
                      onClick={async () => await startQuiz()}
                    >
                      {" "}
                      Start Quiz{" "}
                    </Button>
                  </div>

                </div>
              )}
              <div className="score_container">
                <h1 className="timerStyle" variant="contained">
                  Score: {" "}
                  {score}{" "}
                </h1>
              </div>
            </div>
          ) : (
            <div className="centeredDiv whiteColored">

              <h1> GAME OVER! </h1>
              <h1> Your final score is {score} points.</h1>
              <Button
                className="font_large centeredDiv"
                variant="contained"
                onClick={() => restartGame()}
              >
                Play again?
              </Button>
            </div>
          )
          }
        </div >
      </>
    );
  }
}

export default TriviaGame;
