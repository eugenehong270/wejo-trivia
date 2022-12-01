import "./App.css";
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import { MainPage, UserProfile, TriviaGame, SignupModal, Board } from './components'
import LoginModal from "./components/LoginModal";

function App() {
  return (
    <Router>
      <Navbar />

      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/user/login" element={<LoginModal />} />
          <Route path="user/signup" element={<SignupModal />} />
          <Route path="trivia/start" element={<TriviaGame />} />
          <Route path="user/profile" element={<UserProfile />} />
          <Route path="trivia/leaderboard" element={<Board />} />
        </Routes>
      </div>

    </Router>
  );
}

export default App;
