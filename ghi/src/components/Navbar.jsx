// import { NavLink } from "react-router-dom";
import React from 'react'
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from "./NavBarElements"
import Logo from "../images/logo-no-background.png"
import "../Eugene_Frontend/nav.css"

function Navbar() {
  return (
    <>

      <Nav className="Nav">
        <NavLink to="/">
          <img src={Logo} width="100" alt="Logo" />
        </NavLink>
        {/* <Bars /> */}
        <NavMenu>
          <NavLink to="user/login" activeStyle>
            Login
          </NavLink>
          <NavLink to="user/signup" activeStyle>
            Sign Up
          </NavLink>
          <NavLink to="trivia/start" activeStyle>
            Trivia
          </NavLink>
          <NavLink to="trivia/leaderboard" activeStyle>
            Leaderboard
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
