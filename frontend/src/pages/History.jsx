import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Banner from "../components/Banner";
import "../styles/History.css";
import ReactGA4 from "react-ga4";

const History = () => {
  const location = useLocation();
  const address = process.env.REACT_APP_BACKEND_ADDRESS;

  const [userId, setUserId] = useState(null);
  const [userNickname, setUserNickname] = useState(null);
  const [userStatus, setUserStatus] = useState(null);

  const checkAccessToken = async (
    setUserId,
    setUserNickname,
    setUserStatus
  ) => {
    const token = localStorage.getItem("token");
    //console.log(token);
    if (!token) return; // 토큰이 없으면 검증하지 않음
    else {
      try {
        const response = await fetch(`${address}/verify`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Bearer 형식으로 토큰 전송
          },
        });

        const result = await response.json();
        console.log(result);

        if (result.success) {
          setUserId(result.user.userId);
          setUserNickname(result.user.userNickname);
          setUserStatus(result.user.userStatus);
        }
      } catch (error) {
        console.error("토큰 검증 중 오류 발생:", error);
        localStorage.removeItem("token");
      }
    }
  };
  useEffect(() => {
    checkAccessToken(setUserId, setUserNickname, setUserStatus);
    ReactGA4.send({
      hitType: "pageview",
      page: location.pathname + location.search,
      title: "History",
    });
  }, [location]);

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
