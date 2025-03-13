import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/NavBar.css";

const Navbar = ()=>{

    const navigate = useNavigate(); 

    const handleClicked = (path) =>{
        navigate(path); 
    }

    return(<>
        <div className="navbar_navbar">
            <div className="navbar_top">
                <div className="navbar_logo">
                    <img src="/favicon.png" alt="logo" />
                </div>
                <div className="navbar_packet">
                    <h3>Nimai Nirvana</h3>
                    <p>Develop Mental Resilence & Connect your True Self</p>
                </div>
            </div>
            <div className="navbar_last">
                <button1 onClick={()=>handleClicked("/login")}>Login</button1>
                <button2 onClick={()=>handleClicked("/signUp")}>SignUp</button2>
            </div>
        </div>
    </>)
    
}

export default Navbar;