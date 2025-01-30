// global css
import './css/global.css';

import { Routes , Route } from "react-router-dom";
import UserSignup from "./components/UserSignUp";
import UserLogin from "./components/UserLogin";
import LandingPage from "./components/LandingPage";
import UserDashboard from "./components/UserDashboard";
import OtpVerification from "./components/OtpVerification";


function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/signup" element={<UserSignup admin={false} />}/>
      <Route path="/login" element={<UserLogin admin={false} />}/>
      <Route path="/userDashboard" element={<UserDashboard/>}/>
      <Route path="/user-otp-verification" element={<OtpVerification/>}/>
      <Route path="/admin/signup" element={<UserSignup admin={true} />}/>
      <Route path="/admin/login" element={<UserLogin admin={true} />}/>
    </Routes>
  );
} 

export default App;
