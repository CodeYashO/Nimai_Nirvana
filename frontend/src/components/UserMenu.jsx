import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/UserMenu.css";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(true); // Sidebar initially open
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sidebar-container">
      <div className={`user-menu ${isOpen ? "open" : ""}`} id="menu">
        <button className="toggle-btn" onClick={toggleMenu}>
          {isOpen ? "<" : ">"}
        </button>
        {isOpen && (
          <div className="menu-content">
            {/* Profile Section */}
            <div className="profile">
              <img src="/new-favicon.png" alt="Profile" className="profile-pic" />
              <h3 className="user-name">John Doe</h3>
            </div>

            {/* Menu Options */}
            <ul className="menu-options">
              <li onClick={() => navigate("/dashboard")}><i class="fa-solid fa-house"></i>Dashboard</li>
              <li onClick={() => navigate("/report")}><i class="fa-solid fa-chart-simple"></i>Report</li>
              <li onClick={() => navigate("/myCourse")}><i class="fa-solid fa-film"></i>My Course</li>
              <li onClick={() => navigate("/appointment")}><i class="fa-regular fa-calendar-check"></i>Appointment</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMenu;
