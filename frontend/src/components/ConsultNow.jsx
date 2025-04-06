import React, { useState } from "react";
import axios from "axios";
import "../css/ConsultNow.css";

const ConsultNow = ({ onClose, userfullname, setshowConsult }) => {
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  console.log(email)
  const [meeting, setmeeting] = useState({
    email,
    BookedDate: "",
    appointmentTime: "",
  });

  const handleSubmit = async (e) => {
      e.preventDefault();
      let url = "http://localhost:5000/api/meetings/create-meeting";
      try { 
        const response = await axios.post(url , meeting);
        console.log(response);    
        setshowConsult(false) 
      } catch (error) {
          console.log(error);
      }
  };

  const changeHandler = (e) => {
    setmeeting({ ...meeting, [e.target.name]: e.target.value });
  };

  console.log(meeting);

  return (
    <div className="consultNow_container">
      <button
        className="consultNow_close-button"
        onClick={() => setshowConsult(false)}
      >
        ✖
      </button>{" "}
      {/* Close Button */}
      <header className="consultNow_header">
        <div className="consultNow_badge">Consult</div>
        <span className="consultNow_title">Now</span>
      </header>
      <h1 className="consultNow_username">{userfullname}</h1>
      <form onSubmit={handleSubmit} className="consultNow_form-container">
        <label className="consultNow_label">Schedule Date</label>
        <input
          type="date"
          name="BookedDate"
          value={meeting.BookedDate}
          onChange={changeHandler}
          className="consultNow_input-field"
          required
        />

        <label className="consultNow_label">Schedule Appointment</label>
        <select
          value={meeting.appointmentTime}
          name="appointmentTime"
          onChange={changeHandler}
          className="consultNow_input-field"
          required
        >
          <option value="">Select Time</option>
          <option value="11:00 PM - 12:00 AM (UTC +5:30)">
            11:00 PM - 12:00 AM (UTC +5:30)
          </option>
          <option value="11:00 PM - 12:00 AM (UTC +5:30)">
            11:00 PM - 12:00 AM (UTC +5:30)
          </option>
          <option value="11:00 PM - 12:00 AM (UTC +5:30)">
            11:00 PM - 12:00 AM (UTC +5:30)
          </option>
          <option value="11:00 PM - 12:00 AM (UTC +5:30)">
            11:00 PM - 12:00 AM (UTC +5:30)
          </option>
          <option value="11:00 PM - 12:00 AM (UTC +5:30)">
            11:00 PM - 12:00 AM (UTC +5:30)
          </option>
        </select>

        <button type="submit" className="consultNow_submit-button">
          Book Now
        </button>
      </form>
    </div>
  );
};

export default ConsultNow;
