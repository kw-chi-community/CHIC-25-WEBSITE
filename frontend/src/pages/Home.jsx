import React from "react";
import Banner from "../components/Banner"; 
import kwLogo from "../assets/kwLogo.png"; 
import "../styles/Home.css";

const Home = () => {
  return (
    <div>
      <Banner />
      <main className="home-content">
        <h1>CHICLY, 시크를 더 시크답게</h1>
        <p className="sub-title">INFORMATION CONVERGENCE</p>

        <div className="university-info">
          <div className="kw-logo">
            <img src={kwLogo} alt="Kwangwoon University Logo" />
          </div>
          <span>KWANGWOON UNIVERSITY</span>
        </div>
      </main>
    </div>
  );
};

export default Home;
