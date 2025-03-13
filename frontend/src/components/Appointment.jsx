import React, { useState } from "react";
import Navbar from "./NavBar";
import Footer from "./Footer";
import UserMenu from "./UserMenu";
import FloatingButton from "./FloatingButton";
import ConsultNow from "./ConsultNow";
import "../css/Appointment.css";

const Appointment = () => {
  const [isShrunk, setIsShrunk] = useState(false);
  const [showConsultNow, setShowConsultNow] = useState(false);

  return (
    <>
      <Navbar />
      <div className="appointment-dashboard">
        <FloatingButton onClick={() => setShowConsultNow(true)} />
        <UserMenu onToggle={() => setIsShrunk(!isShrunk)} />

        <div className="appointment-schedule">
          {showConsultNow && <ConsultNow onClose={() => setShowConsultNow(false)} />}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Appointment;
