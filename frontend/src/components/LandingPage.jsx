import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import "../css/LandingPage.css"


const LandingPage = ()=>{
    const navigate = useNavigate(); 

    const handleClicked = (path) =>{
        navigate(path); 
    }

    return(
        <>
            <div className="container">  
                <Navbar/>
                <div className="dashboard">
                    <div className="content">
                        <div className="Data">
                            <div className="data">
                                <img src="./nimai.png" alt="" />
                            </div>
                            <div className="data">
                                <p>Develop mental resilence & Connect your True self</p>
                            </div>
                            <div className="data">
                                <button onClick={()=>handleClicked("/askAi")}>ASK AI</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingPage;