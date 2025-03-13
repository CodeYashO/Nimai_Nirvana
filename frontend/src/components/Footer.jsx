import React from 'react';
import '../css/Footer.css';

const Footer = () => {
  return (
    <div className="footer">
        <div className="footer-about">
            <a href="">About Us</a>
            <a href="">Contact Us</a>
            <a href="">Disclaimer</a>
            <a href="">Privacy Policy</a>
            <a href="">Help</a>
        </div>
        <div className="footer-socialmedia">
            <a href="" title='Instagram'><i class="fa-brands fa-instagram"></i></a>
            <a href="" title='Facebook'><i class="fa-brands fa-facebook"></i></a>
            <a href="" title='Youtube'><i class="fa-brands fa-youtube"></i></a>
            <a href="" title='Twitter'><i class="fa-brands fa-twitter"></i></a>
        </div>
        <div className="footer-copyright" style={{textAlign:"center",fontSize:"12px",marginTop:"5px"}}>
            <p>© Copyright 2024 - Nimai Nirvana</p>
        </div>
    </div>
  )
}

export default Footer