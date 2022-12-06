import { React, useEffect } from 'react'
import { Nav, NavLink, NavMenu } from "./NavBarElements"
import { useLogOutMutation, useGetTokenQuery } from '../store/api';
import { useNavigate } from 'react-router-dom';
import Logo from "../images/logo-no-background.png"
import '../Frontend/mainPage.css'
import { apiSlice } from '../store/api';
import { useDispatch } from 'react-redux';

function LogoutButton() {
  const navigate = useNavigate();
  const [logOut, { data }] = useLogOutMutation();
  const dispatch = useDispatch()

  useEffect(() => {
    if (data) {
      dispatch(apiSlice.util.resetApiState());
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
        {token
          ? <h3 className='welcome neonText'>Welcome, {token?.user.username}</h3>
          : <h3></h3>}
        <NavLink to="/">
          <img src={Logo} width="70" alt="Logo" />
        </NavLink>
        <NavMenu>
          {tokenLoading
            ? <NavLink show={false} to="user/login" activeStyle>
              Login
            </NavLink>
            : token
              ? <LogoutButton />
              : <NavLink show={false} to="user/login" activeStyle>
                Login
              </NavLink>}
          {!token
            ? <NavLink show={true} to="user/signup" activeStyle >
              Sign Up
            </NavLink>
            : <h3></h3>}
          <NavLink to="trivia/start">
            Trivia
          </NavLink>
          <NavLink to="trivia/leaderboard">
            Leaderboard
          </NavLink>
          <NavLink to="user/profile">
            Profile
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  )
};

export default Navbar;
