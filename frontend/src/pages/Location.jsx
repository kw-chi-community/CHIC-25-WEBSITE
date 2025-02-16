import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../components/Banner";
import "../styles/Location.css";

const Location = () => {
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
    <>
      <Banner />
      <div className="container">
        <h1>오시는 길</h1>

        <div className="location-info">
          <h2>📍 주소</h2>
          <p> [01897] 서울특별시 노원구 광운로 20 광운대학교 새빛관</p>

          <h2>🚆 대중교통 이용 안내</h2>
          <ul>
            <li>
              <strong>지하철:</strong> 1호선 광운대역 1번 출구에서 도보 10분
            </li>
            <li>
              <strong>버스:</strong> 기념관 앞 정류장에서 261, 1017, 1138번 버스{" "}
              <br />
              or 광운대역 정류장에서 노원09, 173, 261, 1130, 1133번 버스 이용
            </li>
          </ul>
        </div>

        <iframe
          title="동아리 위치"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3160.252906447851!2d127.0608933!3d37.6197384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357cbbeaaf919c85%3A0xbef57637167e129c!2z6rSR7Jq064yA7ZWZ6rWQIOyDiOu5m-q0gA!5e0!3m2!1sko!2skr!4v1738825347692!5m2!1sko!2skr"
          width="100%"
          height="400"
          style={{ border: 0, borderRadius: "10px", marginTop: "20px" }}
          allowFullScreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        />
      </div>
    </>
  );
};

export default Location;
