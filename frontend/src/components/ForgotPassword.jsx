import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Footer from "./Footer";
import Navbar from "./NavBar";
import "../css/ForgotPassword.css";

const ForgotPassword = () => {
    const navigate = useNavigate();

    const [formData , setFormData] = useState({email : ""});
    console.log(formData)

    const handleChange = (e) => {
        setFormData({...formData , [e.target.name] : e.target.value});
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/user/forgot-password/" , formData);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="forgot_password_container">
      {/* Header */}
     <Navbar/>

      <div className="forgot_password_form-container">
        <h2 className="forgot_password_form-title">Change Password</h2>
        <form className="forgot_password_form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email ID"
            className="forgot_password_input-field"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <button type="submit" className="forgot_password_submit-button">
            Get a Link.
          </button>
        </form>
      </div>

      <Footer/>
    </div>
  );
};

export default ForgotPassword;
