// import { NavLink } from "react-router-dom";
import React from 'react'
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from "./NavBarElements"

function Navbar() {
  return (
    <>
      <Nav>
        <NavLink to="/">
          <h1>WEJO</h1>
        </NavLink>
        <Bars />
        <NavMenu>

          <NavLink to="user/signup" activeStyle>
            <h1>Sign Up</h1>
          </NavLink>

          <NavLink to="trivia/start" activeStyle>
            <h1>Trivia</h1>
          </NavLink>




        </NavMenu>
        <NavBtn>
          <NavBtnLink to="user/profile">
            <h1>Profile</h1>
          </NavBtnLink>
        </NavBtn>


      </Nav>
    </>
  );
}

export default Navbar;
