import { React, useEffect } from 'react'
import { Nav, NavLink, NavMenu, Bars } from "../style/NavBarElements"
import { useLogOutMutation, useGetTokenQuery } from '../store/api';
import { useNavigate } from 'react-router-dom';
import Logo from "../images/logo-no-background.png"
import '../style/mainPage.css'
import { apiSlice } from '../store/api';
import { useDispatch } from 'react-redux';
import Soundtrack from './Soundtrack.jsx';


function LogoutButton() {
  const navigate = useNavigate();
  const [logOut, { data }] = useLogOutMutation();
  const dispatch = useDispatch()

  useEffect(() => {
    if (data) {
      dispatch(apiSlice.util.resetApiState());
      navigate('/module3-project-gamma/');
    }
  }, [data, dispatch, navigate]);

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

        <NavLink>
          {token
            ? <h3 className='welcome neonText'>Welcome, {token?.user.username}</h3>
            : <h3>{" "}</h3>}
        </NavLink>

        <NavLink>
          <Soundtrack />
        </NavLink>

        <NavLink to="/">
          <img className="logo" src={Logo} width="70" alt="Logo" />
        </NavLink>

        <Bars />

        <NavMenu>
          {tokenLoading
            ? <NavLink show={false} to="/module3-project-gamma/user/login" activeStyle>
              Login
            </NavLink>
            : token
              ? <LogoutButton />
              : <NavLink show={false} to="/module3-project-gamma/user/login" activeStyle>
                Login
              </NavLink>}
          {!token
            ? <NavLink show={true} to="/module3-project-gamma/user/signup" activeStyle >
              Sign Up
            </NavLink>
            : <h3>{" "}</h3>}
          <NavLink to="/module3-project-gamma/trivia/start">
            Trivia
          </NavLink>
          <NavLink to="/module3-project-gamma/trivia/leaderboard">
            Leaderboard
          </NavLink>
          {token
            ? <NavLink show={true} to="/module3-project-gamma/user/profile">
              Profile
            </NavLink>
            : <h3>{" "}</h3>}
        </NavMenu>

      </Nav>
    </>
  )
};

export default Navbar;
