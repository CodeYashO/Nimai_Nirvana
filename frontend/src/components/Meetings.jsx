import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Meetings.css";

const Meetings = ({setshowConsult}) => {
  const navigate = useNavigate();
  const [totalmeeting, settotalmeeting] = useState([1, 2, 3, 4 , 5]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const checkingToken = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/user/verify-token",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.data.valid) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
        console.log(response);
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
        // console.log(error);
      }
    };
    checkingToken();
  });

  console.log(totalmeeting);

  return (    
      <div className="meetings_container">
        <button className="meetings_close-button" onClick={() => setshowConsult(true)}>+</button>
        {/* Close Button */}
        <header className="meetings_header">
          <div className="meetings_badge">Consult</div>
          <span className="meetings_title">Now</span>
        </header>
        {totalmeeting.map((ele) => {
          return (
            <div className="meetings-booked-container">
              <h2>Meetings 01</h2>
              <div className="meetings-booked-content">
                <div className="meetings-booked">
                  <h3>booked Date</h3>
                  <span>13/13/31</span>
                </div>

                <div className="meetings-booked">
                  <h3>Time Duration</h3>
                  <span>1:00pm - 4:00pm</span>
                </div>

                <div className="meetings-booked">
                  <h3>Status</h3>
                  <span>completed</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
  );
};

export default Meetings;
