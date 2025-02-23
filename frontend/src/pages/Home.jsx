import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../components/Banner";
import Icons from "../components/Icons";
import kwLogo from "../assets/kwLogo.png";
import "../styles/Home.css";

const text1 = "CHICLY, 시크를 더 시크답게";
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

  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const recruitmentStart = new Date("2025-01-31");
  const recruitmentEnd = new Date("2025-02-12");
  const currentDate = new Date();

  const handleRecruitClick = () => {
    // 현재 날짜가 모집 기간인지 확인
    if (currentDate >= recruitmentStart && currentDate <= recruitmentEnd) {
      navigate("/recruit"); // Recruit.jsx로 이동
    } else {
      setShowPopup(true); // 팝업 메시지 표시
    }
  };

  const [images, setImages] = useState([]);
  const sliderRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    // 이미지 경로를 생성
    const imagePaths = Array.from({ length: 11 }, (_, i) =>
      require(`../assets/img/${i + 1}.jpg`)
    );
    setImages(imagePaths);

    // 슬라이더 애니메이션 시작
    startAnimation();

    return () => {
      // 컴포넌트 언마운트 시 애니메이션 정지
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const startAnimation = () => {
    const slider = sliderRef.current;
    let position = 0;

    const animate = () => {
      position -= 1; // 이동 속도 조절
      if (position <= -slider.scrollWidth / 2) {
        position = 0;
      }
      slider.style.transform = `translateX(${position}px)`;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
  };

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
      <button className="recruit-button" onClick={handleRecruitClick}>
        RECRUIT
      </button>
      {/* 팝업 메시지 */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>현재 신규회원 모집기간이 아닙니다.</p>
            <button onClick={() => setShowPopup(false)}>닫기</button>
          </div>
        </div>
      )}
      <div className="slider-container">
        <div className="slider" ref={sliderRef}>
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              className="slider-image"
            />
          ))}
          {/* 이미지를 반복하여 순환 효과를 만듦 */}
          {images.map((image, index) => (
            <img
              key={`dup-${index}`}
              src={image}
              alt={`Slide ${index + 1}`}
              className="slider-image"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
