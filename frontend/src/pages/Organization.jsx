import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../components/Banner";
import "../styles/Organization.css";

const Organization = () => {
  return (
    <>
      <Banner />
      <div className="container">
        <h1>조직도</h1>
        <div className="org-chart">
          <div className="org-level">
            <div className="org-node president">
              <strong>학회장</strong>
              <span>천성윤</span>
            </div>
            <div className="org-node vice-president">
              <strong>부학회장</strong>
              <span>전서연</span>
            </div>
          </div>

          <div className="org-level departments">
            <div className="org-node department">
              <strong>운영관리부</strong>
              <span>라현아</span>
            </div>
            <div className="org-node department">
              <strong>연구개발부</strong>
              <span>최은비</span>
            </div>
            <div className="org-node department">
              <strong>홍보기획부</strong>
              <span>유아름</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Organization;
