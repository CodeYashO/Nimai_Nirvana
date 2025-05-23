import { useEffect , useState } from "react";
import axios from "axios";
import Navbar from "./NavBar";
import { useNavigate } from "react-router-dom";
import "../css/Appointment.css"
import Footer from "./Footer";
import ConsultNow from "./ConsultNow";
import Meetings from "./Meetings";

const Appointment = () => {
  const navigate = useNavigate();
  const [showConsult , setshowConsult] = useState(true);
  const [userfullname , setuserfullname] = useState("");
  const [username , setusername] = useState("");
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
        const fullName = response.data.user.name.split(" ")[0] + " " + response.data.user.name.split(" ")[1];
        setuserfullname(fullName);
        const firstname = response.data.user.name.split(" ")[0][0];
        const lastname = response.data.user.name.split(" ")[1][0];
        setusername(firstname + "" + lastname);

        if(!response.data.valid) {
            localStorage.removeItem("token");
            navigate("/login");
            return ;
        }
        console.log(response);
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/login");
        return ;
        // console.log(error);
      }
    };
    checkingToken();
  });

  return (
    <div className="appointment_main_container">
      <Navbar username={username}/>
      <div className="appointment_container">
        <div className="appointment_menu">
            <div className="appointment_menu_picture">
              <img src="/new-favicon.png" alt="profile" className="appointment_profile_picture" />
            </div>

            <div className="appointment_menu_link_container">
              <ul className="appointment_menu_link_list">
                <li onClick={() => navigate("/userDashboard")}><i class="fa-solid fa-house"> </i>Dashboard</li>
                <li><i class="fa-solid fa-chart-simple"></i>courses</li>
                <li><i class="fa-solid fa-film"></i>report</li>
                <li onClick={() => navigate("/appointment")}><i class="fa-regular fa-calendar-check"></i>appointment</li>
              </ul>
            </div>
        </div>

        {/* Dashboard content */}
        <div className="appointment_content">
            {showConsult ? <ConsultNow userfullname={userfullname} setshowConsult={setshowConsult}/> : <Meetings setshowConsult={setshowConsult}/>}
        </div>
      </div>

      <Footer/>
    </div>
  );
};

export default Appointment;
