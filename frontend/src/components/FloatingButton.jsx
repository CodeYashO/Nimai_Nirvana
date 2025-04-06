import { useState } from "react";
import { FaCalendarCheck } from "react-icons/fa6";
import "../css/FloatingButton.css";

const FloatingButton = ({ onClick }) => { 
  const [hover, setHover] = useState(false);

  return (
    <div className="floating-button-wrapper">
      <button
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => {
          onClick();   
        }}
        className={`floating-button ${hover ? "hover" : ""}`}
      >
        <FaCalendarCheck size={20} className="icon" />
        <span className="floating-button-text">{hover ? "Book Appointment" : ""}</span>
      </button>  
    </div>
  );
};

export default FloatingButton;
