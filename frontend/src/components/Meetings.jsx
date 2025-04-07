import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Meetings.css";

const Meetings = ({setshowConsult}) => {
  const navigate = useNavigate();
  const [totalmeeting, settotalmeeting] = useState([]);
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchingToken = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/meetings/get-user-meeting/${email}`);
        settotalmeeting([...response.data.meetings]);
      }catch(error) {
        console.log(error);
      }
    };
    fetchingToken();
  }, []);

  console.log(totalmeeting);

  return (    
      <div className="meetings_container">
        <button className="meetings_close-button" onClick={() => setshowConsult(true)}>+</button>
        {/* Close Button */}
        <header className="meetings_header">
          <div className="meetings_badge">Consult</div>
          <span className="meetings_title">Now</span>
        </header>
        {totalmeeting.map((ele , index) => {
          return (
            <div className="meetings-booked-container">
              <h2>{`Meeting - #${index + 1}`}</h2>
              <div className="meetings-booked-content">
                <div className="meetings-booked">
                  <h3>Booked Date</h3>
                  <span>{ele.BookedDate}</span>
                </div>

                <div className="meetings-booked">
                  <h3>Time Duration</h3>
                  <span>{ele.appointmentTime}</span>
                </div>

                <div className="meetings-booked">
                  <h3>Status</h3>
                  <span className={`meetings-status-${ele.status}`}>{ele.status ? "completed" : "pending"}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
  );
};

export default Meetings;
