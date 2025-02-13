import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../components/Banner";
import "../styles/History.css";

const History = () => {
  return (
    <>
      <Banner />
      <div className="container">
        <h1>동아리 연혁</h1>
        <ul className="timeline">
          <li>
            <span className="date">2021.08.</span> CHIC 창설
          </li>
          <li>
            <span className="date">2023.12.27.</span> 🌟 CHIC 4기 🌟
          </li>
          <li>
            <span className="date">2024.01.18~19.</span> 제1회 아이디어톤
          </li>
          <li>
            <span className="date">2024. 여름</span> 광운대x동덕여대 협업
            프로젝트 "UXIC"
          </li>
          <li>
            <span className="date">2025.02.13.</span> 🌟 CHIC 5기 🌟
          </li>
          <li>
            <span className="date">20XX년</span> ipsum lorem
          </li>
          <li>
            <span className="date">20XX년</span> ipsum lorem
          </li>
          <li>
            <span className="date">20XX년</span> ipsum lorem
          </li>
          <li>
            <span className="date">20XX년</span> ipsum lorem
          </li>
          <li>
            <span className="date">20XX년</span> ipsum lorem
          </li>
        </ul>
      </div>
    </>
  );
};

export default History;
