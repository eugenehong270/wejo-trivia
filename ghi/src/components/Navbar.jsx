import { NavLink } from "react-router-dom";

function Navbar() {
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

export default Navbar;
