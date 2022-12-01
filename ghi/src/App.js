import "./App.css";
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import { MainPage, UserProfile, TriviaGame, SignupModal, Leaderboard } from './components'

function App() {
  return (
    <Router>
      <Navbar />

      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="user/signup" element={<SignupModal />} />
          <Route path="trivia/start" element={<TriviaGame />} />
          <Route path="user/profile" element={<UserProfile />} />
          <Route path="trivia/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>

    </Router>
  );
}

export default App;
