// import { NavLink } from "react-router-dom";
import React from 'react'
import { Nav, NavLink, NavMenu } from "./NavBarElements"
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
          <NavLink to="user/login">
            Login
          </NavLink>
          <NavLink to="user/signup">
            Sign Up
          </NavLink>
          <NavLink to="trivia/start">
            Trivia
          </NavLink>
          <NavLink to="trivia/leaderboard">
            Leaderboard
          </NavLink>
          <NavLink to="user/profile">
            Profile
          </NavLink>
          {/* <NavLink to="/" activeStyle>
            Logout
          </NavLink> */}
        </NavMenu>
      </Nav>

    </>
  );
}

export default Navbar;
