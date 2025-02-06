import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../components/Banner";
import "../styles/About.css";

const History = () => {
  return (
    <>
      <Banner />
      <div className="container">
        <h1>동아리 연혁</h1>
        <ul className="timeline">
          <li>
            <span className="date">20XX년</span> - ipsum lorem
          </li>
          <li>
            <span className="date">20XX년</span> - ipsum lorem
          </li>
          <li>
            <span className="date">20XX년</span> - ipsum lorem
          </li>
          <li>
            <span className="date">20XX년</span> - ipsum lorem
          </li>
        </ul>
      </div>
    </>
  );
};

export default History;
