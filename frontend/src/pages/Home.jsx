import React, { useState, useEffect } from "react";
import Banner from "../components/Banner";
import Icons from "../components/Icons";
import kwLogo from "../assets/kwLogo.png";
import "../styles/Home.css";

const text1 = "CHICLY, 치크를 더 치크답게";
const text2 = "INFORMATION CONVERGENCE";

const Home = () => {
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
  }, []);
  return (
    <div>
      <Banner />
      <Icons />
      <main className="home-content">
        <h1>
          {text1.split("").map((char, index) => (
            <span
              key={index}
              className="fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {char === " " ? "\u00A0" : char} {/* 공백 처리 */}
            </span>
          ))}
        </h1>
        <p className="sub-title">
          {text2.split("").map((char, index) => (
            <span
              key={index}
              className="fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {char === " " ? "\u00A0" : char}
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
