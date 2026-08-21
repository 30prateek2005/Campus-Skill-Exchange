import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {

  localStorage.removeItem("token");

  alert("Logged Out Successfully");

  navigate("/auth");
};
  return (
    <nav className="navbar">

      <Link to="/" className="logo">
  Campus Skill Exchange
</Link>

      <div className="nav-links">
        {/* <Link to="/auth">
  Login
</Link> */}

        <Link to="/home">
          Home
        </Link>

        

       
        <Link to="/search">
         Search
          </Link>
          <Link to="/requests">
  Requests
</Link>
<Link to="/resources">
  Resources
</Link>

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/profile">
          Profile
        </Link>
        <Link to="/chat">
  Chat
</Link>
        <button onClick={handleLogout}>
  Logout
</button>
       

      </div>

    </nav>
  );
}

export default Navbar;