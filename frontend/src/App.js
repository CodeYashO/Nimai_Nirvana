// global css
import './css/global.css';

import { Routes , Route } from "react-router-dom";
import UserSignup from "./components/UserSignUp";
import UserLogin from "./components/UserLogin";
import LandingPage from "./components/LandingPage";
import OtpVerification from "./components/OtpVerification";
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Appointment from './components/Appointment';
import UserDashboard from './components/UserDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/signup" element={<UserSignup admin={false} />}/>
      <Route path="/login" element={<UserLogin admin={false} />}/>
      <Route path="/user-otp-verification" element={<OtpVerification/>}/>
      <Route path="/admin/signup" element={<UserSignup admin={true} />}/>
      <Route path="/admin/login" element={<UserLogin admin={true} />}/>
      <Route path="/reset-password/:token" element={<ResetPassword/>}/>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
      <Route path='/appoinment' element={<Appointment/>} />
      <Route path='/userDashboard' element={<UserDashboard/>}/>
      <Route path='/appointment' element={<Appointment/>}/>
    </Routes>
  );
} 

export default App; 
