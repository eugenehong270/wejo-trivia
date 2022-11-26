import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import {MainPage, TriviaGameStart, TriviaGamePlay, TriviaGameEnd} from './components'

function App() {

  return (
     <BrowserRouter>
      <div className="container">
        <Routes>
          <Route index element={<MainPage />} />

          <Route path="trivia/start" element={<TriviaGameStart />} />
          <Route path="trivia/play" element={<TriviaGamePlay />} />
          <Route path="trivia/end" element={<TriviaGameEnd />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
