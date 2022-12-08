import React from 'react';
import { NavLink } from 'react-router-dom';
import "../style/starsStyle.css"
import "../style/mainPage.css"
import "../style/newbutton.css"


const MainPage = () => {
  return (
    <div className='main'>
      <div className='content10'>
        <h1 className='size'>Welcome!</h1>
        <h1 className='size'>Choose your game:</h1>
      </div>
      <div className='content20'>
        <NavLink to="/module3-project-gamma/trivia/start" activeStyle>
          <button className="btn third">Trivia</button>
        </NavLink>
      </div>
    </div>
  )
}

export default MainPage
