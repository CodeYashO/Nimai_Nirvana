import { useNavigate , useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Footer from "./Footer";
import "../css/ResetPassword.css";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const {token} = useParams();

  const navigate = useNavigate();

  console.log(formData);

  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/auth/user/reset-password/${token}` , formData);
      console.log(response);
      navigate('/userDashboard');
    }catch(error) {
      setMessage("something went wrong.");
    }
  }

  return (
    <div className="reset-password_container">
      {/* Header */}
      <header className="reset-password_header">
        <h1 className="reset-password_brand" onClick={() => navigate('/login')} >Nimai Nirvana</h1>
        <div className="reset-password_auth-buttons">
          <button className="reset-password_login-button" onClick={() => navigate('/login')} >Login</button>
          <button className="reset-password_signup-button" onClick={() => navigate('/signup')}>SignUp</button>
        </div>
      </header>

      {/* Signup Form */}
      <div className="reset-password_form-container">
        <h2 className="reset-password_form-title">Change Password</h2>
        <form className="reset-password_form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email ID"
            className="reset-password_input-field"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter a new Password"
            className="reset-password_input-field"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="reset-password_submit-button">
            Reset Password
          </button>
        </form>
      </div> 

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default ResetPassword;
