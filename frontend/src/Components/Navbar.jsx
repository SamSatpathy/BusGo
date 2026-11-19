import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../Components/Navbar.css"
function Navbar() {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
  dispatch({ type: "LOGOUT" });
  navigate("/login");
};
 return (
    <nav className="navbar">
      <Link to="/" className="logo">BusGo</Link>
      <div className="nav-links">
        <Link to="/">Home</Link>

        {user ? (
          <>
            <Link to="/my-bookings">My Bookings</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
            <Link to="/my-bookings">My Bookings</Link>  
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;