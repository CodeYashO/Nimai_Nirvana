import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import "../css/UserSignUp.css"; // Keep your existing CSS file for styles.
import Navbar from "./NavBar";

const UserSignup = ({admin}) => {
  console.log(admin);
  console.log(window.location.href);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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

    let url = "http://localhost:5000/api/auth/user/signup";

    try { 
      const response = await axios.post(url , formData);
      console.log(response);     
      if (response.status === 201) {
        setMessage("User registered successfully!");
        setFormData({ name: "", email: "", phone: "", password: "" , role : "user"}); // Reset form
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
    <div className="user_signup_container">
      {/* Header */}
     
     <Navbar/>
     
      {/* Signup Form */}
      <div className="user_signup_form-container">
        <h2 className="user_signup_form-title">Create Your Account</h2>
        <form className="user_signup_form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            className="user_signup_input-field"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter Email ID"
            className="user_signup_input-field"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Enter Phone Number"
            className="user_signup_input-field"
            value={formData.number}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="user_signup_input-field"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="user_signup_submit-button">
            Sign up →
          </button>
        </form>
        {message && <p className="user_signup_message">{message}</p>}
        <p className="user_signup_login-link">
          Already Registered? <a onClick={() => navigate('/login')} >Login</a>
        </p>
      </div>

      <Footer/>
    </div>
  );
};

export default UserSignup;
