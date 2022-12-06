import "./App.css";
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import { MainPage, UserProfile, TriviaGame, SignupModal, Soundtrack } from './components'
import LoginModal from "./components/LoginModal";
import GamesList from "./components/GamesList";

function App() {
  return (

    <>
      <div>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>WEJO Games</title>
        <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" href="style.css" />
        <section className="wrapper">
          <div id="stars" />
          <div id="stars2" />
          <div id="stars3" />
        </section>
      </div>

      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/user/login" element={<LoginModal />} />
            <Route path="user/signup" element={<SignupModal />} />
            <Route path="trivia/start" element={<TriviaGame />} />
            <Route path="user/profile" element={<UserProfile />} />
            <Route path="trivia/leaderboard" element={<GamesList />} />
          </Routes>
        </div>
      </Router>
      <div><Soundtrack /></div>
    </>

  );
}

export default App;
