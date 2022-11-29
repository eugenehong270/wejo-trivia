import "./App.css";
import SignUp from "./SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {MainPage, Navbar, UserProfile, TriviaGame, SignupModal, Leaderboard} from './components'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="trivia" element={<MainPage />} />
          <Route path="user/signup" element={<SignupModal />} />
          <Route path="trivia/start" element={<TriviaGame />} />
          <Route path="user/profile" element={<UserProfile />} />
          <Route path="trivia/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
