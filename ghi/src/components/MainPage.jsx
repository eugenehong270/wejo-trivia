import React from 'react';
import { NavLink } from 'react-router-dom';
import "../Eugene_Frontend/starsStyle.css"
import "../Eugene_Frontend/mainPage.css"
import "../Eugene_Frontend/newbutton.css"


const MainPage = () => {
  return (
    <div className='main'>
      <div className='content10'>
        <h1 className='size'>Welcome!</h1>
        <h1 className='size'>Choose your game:</h1>
      </div>
      <div className='content20'>
        <NavLink to="trivia/start" activeStyle>
          <button className="btn third">Trivia</button>
        </NavLink>
      </div>
    </div>
  )
}

export default MainPage
