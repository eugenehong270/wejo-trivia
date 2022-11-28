import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <NavLink className="navbar-brand" to="/trivia">
        WEJO Trivia
      </NavLink>
      <NavLink className="navbar-brand" to="/trivia/signup">
        Sign Up
      </NavLink>
    </nav>
  );
}

export default Nav;
