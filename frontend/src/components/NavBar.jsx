import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/NavBar.css";

const Navbar = ({username}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname.split("/")[1];

  return (
    <>
      <header className="header_header">
        <h1 className="header_brand" onClick={() => navigate("/login")}>
          Nimai Nirvana
        </h1>
        <div className="header_auth-buttons">
          {path == "userDashboard" ? (
            <div className="header_user_picture">
              <span className="header_user_picture_name">
                {username}
              </span>
              </div>
          ) : (
            <>
              <button
                className="header_login-button"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="header_signup-button"
                onClick={() => navigate("/signup")}
              >
                SignUp
              </button>
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
