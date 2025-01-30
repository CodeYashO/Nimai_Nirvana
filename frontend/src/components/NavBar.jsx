import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/NavBar.css";

const Navbar = ()=>{

    const navigate = useNavigate(); 

    const handleClicked = (path) =>{
        navigate(path); 
    }

    return(<>
        <div className="navbar">
            <div className="top">
                <div className="logo">
                    <img src="/favicon.png" alt="logo" />
                </div>
                <div className="packet">
                    <h3>Nimai Nirvana</h3>
                    <p>Develop Mental Resilence & Connect your True Self</p>
                </div>
            </div>
            <div className="last">
                <button1 onClick={()=>handleClicked("/login")}>Login</button1>
                <button2 onClick={()=>handleClicked("/signUp")}>SignUp</button2>
            </div>
        </div>
    </>)
    
}

export default Navbar;