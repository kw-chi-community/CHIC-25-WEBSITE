import React from "react";
import "../styles/Banner.css";
import mainLogo from "../assets/mainLogo.png";

const Banner = () => {
  return (
    <header className="banner">
      <div className="main-logo">
        <img src={mainLogo} alt="Chicly Logo" />
      </div>
      <nav className="banner-nav">
        <ul>
          <li>CHICLY</li>
          <li>NOTICE</li>
          <li>COMMUNITY</li>
          <li>RECRUIT</li>
          <li className="banner-login">LOGIN</li>
        </ul>
      </nav>
    </header>
  );
};

export default Banner;
