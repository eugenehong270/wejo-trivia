// import { NavLink } from "react-router-dom";
import { React, useEffect } from 'react'
import { Nav, NavLink, NavMenu } from "./NavBarElements"
import { useLogOutMutation, useGetTokenQuery } from '../store/api';
import { useNavigate } from 'react-router-dom';
import Logo from "../images/logo-no-background.png"

function LogoutButton() {
  const navigate = useNavigate();
  const [logOut, { data }] = useLogOutMutation();

  useEffect(() => {
    if (data) {
      navigate('/');
    }
  }, [data, navigate]);

  return (
    <NavLink show={false} onClick={logOut}>
      Logout
    </NavLink>
  );
}

function Navbar() {
  const { data: token, isLoading: tokenLoading } = useGetTokenQuery();

  return (
    <>

      <Nav>
        <NavLink to="/">
          <img src={Logo} width="70" alt="Logo" />
        </NavLink>
        <NavMenu>
          <NavLink to="user/signup">
            {tokenLoading
              ? <NavLink show={false} to="user/login" activeStyle>
                Login
              </NavLink>
              : token
                ? <LogoutButton />
                : <NavLink show={false} to="user/login" activeStyle>
                  Login
                </NavLink>}
            <NavLink to="user/signup" activeStyle>
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

          </NavLink>
        </NavMenu>
      </Nav>

    </>
  )
};

export default Navbar;
