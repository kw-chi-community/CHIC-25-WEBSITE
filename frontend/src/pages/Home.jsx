import React from "react";
import Banner from "../components/Banner"; 
import Icons from "../components/Icons"; 
import kwLogo from "../assets/kwLogo.png"; 
import "../styles/Home.css";

const text1 = "CHICLY, 시크를 더 시크답게";
const text2 = "INFORMATION CONVERGENCE";

const Home = () => {
  return (
    <div>
      <Banner />
      <Icons />
      <main className="home-content">
        <h1>
          {text1.split("").map((char, index) => (
            <span key={index} className="fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
              {char}
            </span>
          ))}
        </h1>
        <p className="sub-title">
          {text2.split("").map((char, index) => (
            <span key={index} className="fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
              {char}
            </span>
          ))}
        </p>

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
