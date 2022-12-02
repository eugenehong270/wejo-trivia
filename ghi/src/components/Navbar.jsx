// import { NavLink } from "react-router-dom";
import React from 'react'
import { Nav, NavLink, NavMenu, NavBtn, NavBtnLink } from "./NavBarElements"
import Logo from "../images/logo-no-background.png"

function Navbar() {
  return (
    <>

      <Nav>
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
          <NavLink to="user/profile" activeStyle>
            Profile
          </NavLink>
        </NavMenu>
      </Nav>

    </>
  );
}

export default Navbar;
