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
        {/* <Bars /> */}
        <NavMenu>

          <NavLink to="user/signup" activeStyle>
            Sign Up
          </NavLink>

          <NavLink to="trivia/start" activeStyle>
            Trivia
          </NavLink>

          <NavLink to="user/login" activeStyle>
            Login
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
