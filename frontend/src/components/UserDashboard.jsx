import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./NavBar";
import { useNavigate } from "react-router-dom";
import "../css/UserDashboard.css";
import Footer from "./Footer";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
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
        const firstname = response.data.user.name.split(" ")[0][0];
        const lastname = response.data.user.name.split(" ")[1][0];
        setusername(firstname + "" + lastname);

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

  const appointmentClickHandler = () => {
    navigate("/appointment");
  };

  return (
    <div className="userdashboard_main_container">
      <Navbar username={username} />
      <div className="userdashboard_container">
        <div className="userdashboard_menu">
          <div className="userdashboard_menu_picture">
            <img
              src="/new-favicon.png"
              alt="profile"
              className="userdashboard_profile_picture"
            />
          </div>

          <div className="userdashboard_menu_link_container">
            <ul className="userdashboard_menu_link_list">
              <li>
                <i class="fa-solid fa-house"> </i>Dashboard
              </li>
              <li>
                <i class="fa-solid fa-chart-simple"></i>courses
              </li>
              <li>
                <i class="fa-solid fa-film"></i>report
              </li>
              <li onClick={appointmentClickHandler}>
                <i class="fa-regular fa-calendar-check"></i>appointment
              </li>
            </ul>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="userdashboard_content"></div>
      </div>

      <Footer />
    </div>
  );
};

export default UserDashboard;
