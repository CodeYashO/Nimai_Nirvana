import React, { useState } from "react";
import "../css/ConsultNow.css";

const ConsultNow = ({ onClose }) => {
  const [scheduleDate, setScheduleDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Appointment Scheduled on: ${scheduleDate} at ${appointmentTime}`);
  };

  return (
    <div className="consultNow_container">
      <button className="consultNow_close-button" onClick={onClose}>✖</button> {/* Close Button */}
      
      <header className="consultNow_header">
        <div className="consultNow_badge">Consult</div>
        <span className="consultNow_title">Now</span>
      </header>
      
      <h1 className="consultNow_username">John Doe</h1>
      
      <form onSubmit={handleSubmit} className="consultNow_form-container">
        <label className="consultNow_label">Schedule Date</label>
        <input
          type="date"
          value={scheduleDate}
          onChange={(e) => setScheduleDate(e.target.value)}
          className="consultNow_input-field"
          required
        />
        
        <label className="consultNow_label">Schedule Appointment</label>
        <select
          value={appointmentTime}
          onChange={(e) => setAppointmentTime(e.target.value)}
          className="consultNow_input-field"
          required
        >
          <option value="">Select Time</option>
          <option value="11:00 PM - 12:00 AM (UTC +5:30)">
            11:00 PM - 12:00 AM (UTC +5:30)
          </option>
        </select>
        
        <button type="submit" className="consultNow_submit-button">Book Now</button>
      </form>
    </div>
  );
};

export default ConsultNow;
