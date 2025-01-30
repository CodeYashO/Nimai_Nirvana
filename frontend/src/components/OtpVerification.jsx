import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For navigation after OTP verification
import "../css/OtpVerification.css";

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
    <div className="otp-container">
      <h2 className="otp-title">OTP Verification</h2>
      <form onSubmit={handleSubmit} className="otp-form">
        <input
          type="email"
          name="email"
          placeholder="Enter your Email"
          className="otp-input"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="otp"
          placeholder="Enter OTP"
          className="otp-input"
          value={formData.otp}
          onChange={handleChange}
          required
        />
        <button type="submit" className="otp-button">Verify OTP</button>
      </form>
      {message && <p className="otp-message">{message}</p>}
    </div>
  );
};

export default OtpVerification;
