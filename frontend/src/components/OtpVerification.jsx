import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For navigation after OTP verification
import "../css/OtpVerification.css";
import Footer from "./Footer";

const OtpVerification = () => {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle OTP verification
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Verifying...");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/user/verify-email", formData);
      console.log(response);

      if (response.status === 200) {
        setMessage("OTP Verified Successfully!");
        navigate("/userDashboard"); // Redirect to dashboard
      } else {
        setMessage(response.data.message || "Invalid OTP. Please try again!");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Unable to connect to the server."
      );
    }
  };

  return (
    <div className="otp_container">
      {/* Header */}
      <header className="otp_header">
        <h1 className="otp_brand" onClick={() => navigate('/login')} >Nimai Nirvana</h1>
        <div className="otp_auth-buttons">
          <button className="otp_login-button" onClick={() => navigate('/login')} >Login</button>
          <button className="otp_signup-button" onClick={() => navigate('/signup')}>SignUp</button>
        </div>
      </header>

      {/* Signup Form */}
      <div className="otp_form-container">
        <h2 className="otp_form-title">Change Password</h2>
        <form className="otp_form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email ID"
            className="otp_input-field"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="otp"
            placeholder="Enter a OTP"
            className="otp_input-field"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="otp_submit-button">
            Verify OTP
          </button>
        </form>
      </div> 

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default OtpVerification;
