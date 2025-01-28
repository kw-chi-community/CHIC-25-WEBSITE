import React from "react";
import { useNavigate } from "react-router-dom"; 
import "../styles/Banner.css";
import mainLogo from "../assets/mainLogo.png";

const Banner = () => {
  const navigate = useNavigate(); 

  return (
    <header className="banner">
      <div className="main-logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        <img src={mainLogo} alt="Chicly Logo" />
      </div>
      <nav className="banner-nav">
        <ul>
          <li className="menu-item">
            CHICLY
            <ul className="sub-menu">
              <li>소개</li>
              <li>조직도</li>
              <li>오시는 길</li>
              <li>연혁</li>
            </ul>
          </li>
          <li className="menu-item">
            NOTICE
            <ul className="sub-menu">
              <li>공지사항</li>
              <li>학사 일정(캘린더)</li>
            </ul>
          </li>
          <li className="menu-item">
            COMMUNITY
            <ul className="sub-menu">
              <li>자유게시판</li>
              <li>비밀게시판</li>
            </ul>
          </li>
          <li className="menu-item">
            RECRUIT
            <ul className="sub-menu">
              <li>지원하기</li>
            </ul>
          </li>
          <li className="banner-login" onClick={() => navigate("/login")}>LOGIN</li> 
        </ul>
      </nav>
    </header>
  );
};

export default Banner;
