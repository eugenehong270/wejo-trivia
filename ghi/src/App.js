import "./App.css";
import SignUp from "./SignUp";
import Nav from "./Navigation/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {MainPage, UserProfile, TriviaGameStart, TriviaGamePlay, TriviaGameEnd} from './components'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/trivia" element={<MainPage />} />
          <Route path="/trivia/signup" element={<SignUp />} />
          <Route path="trivia/start" element={<TriviaGameStart />} />
          <Route path="trivia/play" element={<TriviaGamePlay />} />
          <Route path="trivia/end" element={<TriviaGameEnd />} />
          <Route path="user/profile" element={<UserProfile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
