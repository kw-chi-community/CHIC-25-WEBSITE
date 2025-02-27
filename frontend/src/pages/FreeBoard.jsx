import React, { useState, useEffect } from "react";
import Banner from "../components/Banner";
import Icons from "../components/Icons";
import "../styles/FreeBoard.css";
import CreateArticle from "../components/CreateArticle";
import ReactGA4 from "react-ga4";
import { useNavigate, useLocation } from "react-router-dom";

const FreeBoard = () => {
  const location = useLocation();
  const address = process.env.REACT_APP_BACKEND_ADDRESS;

  const [userId, setUserId] = useState(null);
  const [userNickname, setUserNickname] = useState(null);
  const [userStatus, setUserStatus] = useState(null);

  const checkAccessToken = async (setUserId, setUserNickname) => {
    const token = localStorage.getItem("token");
    console.log(token);
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
        window.location.href = "/freeboard";
      }
    }
  };
  useEffect(() => {
    checkAccessToken(setUserId, setUserNickname, setUserStatus);
    ReactGA4.send({
      hitType: "pageview",
      page: location.pathname + location.search,
      title: "FreeBoard",
    });
  }, [location]);

  return (
    <div className="free-board">
      <Banner />
      <Icons />
      <div className="board-container">자유게시판</div>
      <CreateArticle />
    </div>
  );
};

export default FreeBoard;
