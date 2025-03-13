import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/UserLogin.css"; // Keep your existing CSS file for styles.
import Footer from "./Footer";

const UserLogin = ({admin}) => {
  console.log(admin);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role : admin ? "admin" : "user",
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

    let url = "http://localhost:5000/api/auth/user/login";
    console.log(url)

    try {
      const response = await axios.post(url , formData);
      console.log(response)

      if (response.status === 200) {
        setMessage("User login successfully!");
        setFormData({email: "", password: "" , role : "user"}); // Reset form
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
    <div className="user_login_container">
      {/* Header */}
      <header className="user_login_header">
        <h1 className="user_login_brand" onClick={() => navigate('/login')} >Nimai Nirvana</h1>
        <div className="user_login_auth-buttons">
          <button className="user_login_login-button" onClick={() => navigate('/login')} >Login</button>
          <button className="user_login_signup-button" onClick={() => navigate('/signup')}>SignUp</button>
        </div>
      </header>

      {/* Signup Form */}
      <div className="user_login_form-container">
        <h2 className="user_login_form-title">Login To Your Account</h2>
        <form className="user_login_form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email ID"
            className="user_login_input-field"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="user_login_input-field"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="user_login_submit-button">
            Login  →
          </button>
        </form>
        {message && <p className="user_login_message">{message}</p>}
        <p className="user_login_login-link">
          Don't have a account ? <a onClick={() => navigate('/signup')}>Sign up</a>
        </p>
        <p className="user_login_login-link">
          <a onClick={() => navigate('/forgot-password')}>Forgot Password ? </a>
        </p>
      </div>

      {/* Footer */} 
        <Footer/>
      </div>
  );
};

export default UserLogin;
