import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Banner.css";
import mainLogo from "../assets/mainLogo.png";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <header className="banner">
      <div
        className="main-logo"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        <img src={mainLogo} alt="Chicly Logo" />
      </div>
      <nav className="banner-nav">
        <ul>
          <li className="menu-item">
            CHICLY
            <ul className="sub-menu">
              <li>소개</li>
              <li>조직도</li>
              <li>연혁</li>
            </ul>
          </li>
          <li className="menu-item">
            NOTICE
            <ul className="sub-menu">
              <li
                onClick={() => navigate("/notice")}
                style={{ cursor: "pointer" }}
              >
                공지사항
              </li>
              <li
                onClick={() => navigate("/calendar")}
                style={{ cursor: "pointer" }}
              >
                학사 일정
              </li>
            </ul>
          </li>
          <li className="menu-item">
            COMMUNITY
            <ul className="sub-menu">
              <li
                onClick={() => navigate("/freeboard")}  
                style={{ cursor: "pointer" }}
              >
                자유게시판
              </li>
              <li>비밀게시판</li>
            </ul>
          </li>
          <li className="menu-item">
            RECRUIT
            <ul className="sub-menu">
              <li>지원하기</li>
            </ul>
          </li>
          <li className="banner-login" onClick={() => navigate("/login")}>
            LOGIN
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Banner;
