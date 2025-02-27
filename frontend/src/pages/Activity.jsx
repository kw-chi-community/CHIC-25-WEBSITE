import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Banner from "../components/Banner";
import "../styles/Activity.css";
import ReactGA4 from "react-ga4";
const Activity = () => {
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
      title: "Activity",
    });
  }, [location]);

  const [activeTab, setActiveTab] = useState("study");

  const renderContent = () => {
    switch (activeTab) {
      case "study":
        return (
          <div className="tab-content">
            <p>
              전공과 관련한 다양한 분야의 스터디를 진행합니다. 팀원들과 협력하며
              지식을 공유하고 성장할 수 있는 학습 기회를 얻을 수 있습니다.
            </p>
            <h3>📂 과거 스터디</h3>
            <table>
              <thead>
                <tr>
                  <th>기간</th>
                  <th>주제</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2023.07.</td>
                  <td>데이터분석, 모바일프로그래밍, UX 디자인, Java</td>
                </tr>
                <tr>
                  <td>2024.01.</td>
                  <td>데이터분석 기초, HTML-CSS-JS, AI & 기계학습</td>
                </tr>
                <tr>
                  <td>2024.07.</td>
                  <td>Java Spring Boot, 데이터베이스, NodeJS, React, 딥러닝</td>
                </tr>
              </tbody>
            </table>
            <h3>📂 진행 중인 스터디</h3>
            <table>
              <thead>
                <tr>
                  <th>기간</th>
                  <th>주제</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2025.01.</td>
                  <td>AI & 기계학습</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case "seminar":
        return (
          <div className="tab-content">
            <p>
              현업 개발자, 지도교수님, 디지털경험분석 연구실 (IDEA Lab)의
              세미나를 통해 새로운 기술을 경험하고 트렌드를 파악합니다. → 기술
              세미나 및 1-day 개발 강의
            </p>
            <h3>📂 과거 세미나</h3>
            <table>
              <thead>
                <tr>
                  <th>기간</th>
                  <th>주제</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2023.01.</td>
                  <td>Spring boot One-day workshop</td>
                </tr>
                <tr>
                  <td>2023.10.</td>
                  <td>개발자 특강</td>
                </tr>
                <tr>
                  <td>2023.11.</td>
                  <td>Google Analytics</td>
                </tr>
                <tr>
                  <td>2024.07.</td>
                  <td>넓은 시야로 바라보는 풀스택 이야기</td>
                </tr>
                <tr>
                  <td>2025.02.</td>
                  <td>논문 첫걸음 (ver. 학부생)</td>
                </tr>
                <tr>
                  <td>2025.03.</td>
                  <td>깃허브 특강</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case "ideathon":
        return (
          <div className="tab-content">
            <p>
              여름방학 동안 진행되는 아이디어톤에서 창의적인 아이디어를 개발하고
              발표할 수 있습니다.
            </p>
            <table>
              <thead>
                <tr>
                  <th>기간</th>
                  <th>주제</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2023.01.</td>
                  <td>CHIC아이디어톤 1회</td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td>2025.06.</td>
                  <td>CHIC아이디어톤 2회</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case "project":
        return (
          <div className="tab-content">
            <p>
              스터디를 통해 학습한 내용을 토대로 프로젝트를 진행합니다. 다양한
              실무형 프로젝트를 통해 실질적인 경험을 쌓을 수 있습니다.
            </p>
            <h3>📂 과거 프로젝트</h3>
            <table>
              <thead>
                <tr>
                  <th>기간</th>
                  <th>주제</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2024.07.</td>
                  <td>CHIC x UXITER : 동덕여대 협업 프로젝트</td>
                </tr>
              </tbody>
            </table>
            <h3>📂 진행 중인 프로젝트</h3>
            <table>
              <thead>
                <tr>
                  <th>기간</th>
                  <th>주제</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2025.01.</td>
                  <td>CHIC 홈페이지</td>
                </tr>
                <tr>
                  <td>2025.01.</td>
                  <td>Jamovi 통계 분석 서비스(FE/BE)</td>
                </tr>
                <tr>
                  <td>2025.01.</td>
                  <td>Speech-To-Text 포스트잇(FE/BE)</td>
                </tr>
                <tr>
                  <td>2025.01.</td>
                  <td>광운대학교 교내시설 내비게이션(FE/BE)</td>
                </tr>
                <tr>
                  <td>2025.01.</td>
                  <td>
                    라즈베리파이 기반 키오스크 시스템 및 강의실 예약·관리 웹
                    플랫폼(ADMIN/STUDENT/KIOSK)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Banner />
      <div className="container">
        <h1>동아리 활동</h1>
        <div className="tab-menu">
          <button
            className={activeTab === "study" ? "active" : ""}
            onClick={() => setActiveTab("study")}
          >
            스터디
          </button>
          <button
            className={activeTab === "seminar" ? "active" : ""}
            onClick={() => setActiveTab("seminar")}
          >
            세미나
          </button>
          <button
            className={activeTab === "ideathon" ? "active" : ""}
            onClick={() => setActiveTab("ideathon")}
          >
            아이디어톤
          </button>
          <button
            className={activeTab === "project" ? "active" : ""}
            onClick={() => setActiveTab("project")}
          >
            프로젝트
          </button>
        </div>
        {renderContent()}
      </div>
    </>
  );
};

export default Activity;
