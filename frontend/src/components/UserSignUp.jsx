import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/UserSignUp.css"; // Keep your existing CSS file for styles.

const UserSignup = ({admin}) => {
  console.log(admin);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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

    let url = admin ? "http://localhost:5000/api/auth/admin/signup" : "http://localhost:5000/api/auth/user/signup";

    console.log(url)

    try {
      const response = await axios.post(url , formData );

      if (response.status === 201) {
        setMessage("User registered successfully!");
        setFormData({ name: "", email: "", phone: "", password: "" }); // Reset form
        navigate("/user-otp-verification")
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
        <h1 className="brand" onClick={() => navigate('/login')} >Nimai Nirvana</h1>
        <div className="auth-buttons">
          <button className="login-button" onClick={() => navigate('/login')} >Login</button>
          <button className="signup-button">SignUp</button>
        </div>
      </header>

      {/* Signup Form */}
      <div className="form-container">
        <h2 className="form-title">Create Your Account</h2>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            className="input-field"
            value={formData.name}
            onChange={handleChange}
            required
          />
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
            type="text"
            name="phone"
            placeholder="Enter Phone Number"
            className="input-field"
            value={formData.number}
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
            Sign up →
          </button>
        </form>
        {message && <p className="message">{message}</p>}
        <p className="login-link">
          Already Registered? <a onClick={() => navigate('/login')} >Login</a>
        </p>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-links">
          <a href="#">About Us</a>
          <a href="#">Contact Us</a>
          <a href="#">Disclaimer</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Help</a>
        </div>
        <div className="social-icons">
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">YouTube</a>
        </div>
        <p className="copyright">© Copyright 2024 - Nimai Nirvana</p>
      </footer>
    </div>
  );
};

export default UserSignup;
