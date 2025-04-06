import { useEffect , useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Meetings.css"

const Meetings = () => {
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
    <>
    <h1>hello</h1>
    </>
  );
};

export default Meetings;