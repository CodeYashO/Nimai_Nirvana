import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/UserSignUp.css"; // Keep your existing CSS file for styles.

const UserLogin = ({admin}) => {
  console.log(admin);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  console.log(formData);

  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Processing...");

    let url = admin ? "http://localhost:5000/api/auth/admin/login" : "http://localhost:5000/api/auth/user/login";

    console.log(url)

    try {
      const response = await axios.post(url , formData );
      console.log(response)

      if (response.status === 200) {
        setMessage("User login successfully!");
        setFormData({email: "", password: "" }); // Reset form
        navigate("/userDashboard");
      } else {
        setMessage(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Unable to connect to the server."
      );
    }
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header"> 
        <h1 className="brand" onClick={() => navigate('/')} >Nimai Nirvana</h1>
        <div className="auth-buttons">
          <button className="login-button">Login</button>
          <button className="signup-button" onClick={() => navigate('/signup')} >SignUp</button>
        </div>
      </header>

      {/* Signup Form */}
      <div className="form-container">
        <h2 className="form-title">Login To Your Account</h2>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email ID"
            className="input-field"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="input-field"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="submit-button">
            Login  →
          </button>
        </form>
        {message && <p className="message">{message}</p>}
        <p className="login-link">
          don't have a account ? <a onClick={() => navigate('/signup')}>Sign up</a>
        </p>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-links">
          <a>About Us</a>
          <a>Contact Us</a>
          <a>Disclaimer</a>
          <a>Privacy Policy</a>
          <a>Help</a>
        </div>
        <div className="social-icons">
          <a>Facebook</a>
          <a>Twitter</a>
          <a>YouTube</a>
        </div>
        <p className="copyright">© Copyright 2024 - Nimai Nirvana</p>
      </footer>
    </div>
  );
};

export default UserLogin;
