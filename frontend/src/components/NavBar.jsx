import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/NavBar.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
      <header className="header_header">
        <h1 className="header_brand" onClick={() => navigate("/login")}>
          Nimai Nirvana
        </h1>
        <div className="header_auth-buttons">
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
        </div>
      </header>
    </>
  );
};

export default Navbar;
