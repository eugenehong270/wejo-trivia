import React, { useEffect, useState } from "react";
import { format } from "date-fns"
import Button from "@mui/material/Button";
import parse from "html-react-parser"; // coverts html into string
import { useAddScoreMutation } from '../store/api'
import { useGetTokenQuery } from "../store/api";
import Notification from "./Notification";
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';


import wrongAudio from "../assets/audio/wrong.mp3";
import correctAudio from "../assets/audio/correct.mp3";

import "../trivia.css";


//either start screen with category select is in THIS component,
// or a separate component that generates the url for THIS one to use
const API_URL = "https://opentdb.com/api.php?";
const API_BASE_URL = "https://opentdb.com/api_config.php";


const TriviaGame = () => {
  let [apiFlexibleUrl, setApiUrl] = useState("");
  const { data: tokenData } = useGetTokenQuery();
  const [createFinalScore, result] = useAddScoreMutation()
  let [category, setCategory] = useState("Any")
  let [difficulty, setDifficulty] = useState("Any");
  const [queryDifficulty, setQueryDifficulty] = useState('Mixed')
  let [data, setData] = useState([]); // -> The whole json response from API Trivia
  let [count, setCount] = useState(0);
  let [score, setScore] = useState(0);
  let [maximumPossibleScore, setTotalScore] = useState(0);
  let [quizStarted, setQuizStarted] = useState(false); // Showing Start quiz if false, showing questions and answers if True
  let [correctAnswer, setCorrectAnswer] = useState("")
  let [question, setQuestion] = useState([]); // The current question

  let [possibleAnswers, setPossibleAnswers] = useState([]) // List of all answers ( correct + incorrect ones) for a specific question
  let [gameEnded, setGameEnded] = useState(false);
  let [isAnswerSelected, setIsAnswerSelected] = useState(false);

  let cateroies_list = ['Any', 'General Knowledge', 'Entertainment: Film'];
  let difficulty_list = ['easy', 'medium', 'hard', 'Any']
  const currentDate = new Date()
  const formattedDate = format(currentDate, "yyyy-MM-dd")

  const scoresDictionary = {
    easy: 1,
    medium: 2,
    hard: 3,
  };

  // const categoreiesIds = {
  //     'General Knowledge': 9,
  // 'Entertainment: Books': 10,
  // }

  let correctAudio_obj = new Audio(correctAudio); // get Audio objects
  let wrongAudio_obj = new Audio(wrongAudio);

  // useEffect(() => {
  //   getApiData();
  // }, []);

  const getApiData = async (apiUrl) => {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log("DATA IN getApiData: ", data);
    setData(data);
    return data;
  };

  function incrementCount() {
    count = count + 1;
    setCount(count);
  }
  ;

  function addScore() {
    setScore(score + 10 * scoresDictionary[difficulty]);
    setTotalScore(score + 10 * scoresDictionary[difficulty]);
  };

  const timeout = (delay) => {
    return new Promise((res) => setTimeout(res, delay));
  };

  // const finalScore = ("2022-11-28", category, queryDifficulty, score)

  async function getQuestion(mydata) {
    try {
      setIsAnswerSelected(false);

      setQuestion([]);
      setDifficulty('');
      setCorrectAnswer('');
      setPossibleAnswers([]);

      if (mydata) {
        data = mydata;
        setData(mydata);
      }

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
      console.log("ERROR: ", e)
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
    console.log("CURR CATEGORY:", category);
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

  async function startQuiz() {
    const final_url = buildApiUrl();
    const data = await getApiData(final_url);
    setQuizStarted(true);
    getQuestion(data);
  };


  function buildApiUrl() {
    let final_url = API_URL + "amount=2"
    if (category !== 'Any' && category > 0) {//
      let _category = parseInt(category) + 9
      _category = _category.toString();
      final_url = final_url + "&category=" + _category;
    }

    if (difficulty !== "Any") { // Any Difficulty
      console.log("DIFCULTY IN IF: ", difficulty)
      final_url = final_url + "&difficulty=" + difficulty;
    }

    console.log("final_url: ", final_url);

    return final_url;
  }

  const getCategoryValue = (e) => { // General knowledge ->10,1,2,321,
    setCategory(e.target.value); //  let categories_based_by_string = categoreiesIds[e.target.value]; setCategory(categories_based_by_string);
  };

  const getDifficultyValue = (e) => {
    setDifficulty(e.target.value);
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
      setTotalScore(score + 10 * scoresDictionary[difficulty]);
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
              <div>
                <div className="categoryform">
                  <FormControl fullWidth>
                    <InputLabel id="selectLabel" className="selectlabel">Select category</InputLabel>
                    <Select
                      labelId="selectLabel"
                      id="demo-simple-select"
                      label="Category"
                      value={category}
                      onChange={getCategoryValue}
                      defaultValue={category}
                    >
                      {cateroies_list.map((category, idx) => {
                        // for answer in response_answer make button
                        return (
                          <MenuItem value={idx}>{category}</MenuItem> // value = {category}
                        );
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
                      onChange={getDifficultyValue}
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
                  onClick={startQuiz}
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
    );
  }
}

export default TriviaGame;
