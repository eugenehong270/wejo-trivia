import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <NavLink className="navbar-brand" to="/">WEJO</NavLink>
      <NavLink className="navbar-brand" to="/user/signup">Sign Up</NavLink>
    </nav>
  );
}

export default Navbar;
