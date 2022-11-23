import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import {MainPage, TriviaGameStart} from './components'

function App() {

  return (
     <BrowserRouter>
      <div className="container">
        <Routes>
          <Route index element={<MainPage />} />

          <Route path="trivia/start" element={<TriviaGameStart />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
