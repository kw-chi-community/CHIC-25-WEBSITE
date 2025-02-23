import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../components/Banner";
import "../styles/Recruit.css";

const Recruit = () => {
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

  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    semester: "",
    email: "",
    phone: "",
    interests: [],
    activityPeriod: "",
    introduction: "",
    goals: "",
    collaboration: "",
    comments: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        interests: checked
          ? [...prev.interests, value]
          : prev.interests.filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 입력되지 않은 필드 확인
    const requiredFields = [
      "name",
      "studentId",
      "semester",
      "email",
      "phone",
      "interests",
      "activityPeriod",
      "introduction",
      "goals",
      "collaboration",
    ];

    const missing = requiredFields.filter((field) => {
      if (Array.isArray(formData[field])) {
        return formData[field].length === 0;
      }
      return !formData[field];
    });

    if (missing.length > 0) {
      setMissingFields(missing);
      setShowPopup(true);
      return;
    }

    try {
      const response = await fetch(`${address}/recruit/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("지원서가 성공적으로 제출되었습니다.");
        navigate("/success");
      } else {
        alert("제출 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("지원서 제출 오류:", error);
      alert("서버 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <Banner />
      <div className="container">
        <h1>RECRUIT</h1>
        <section className="recruit-section">
          <h2 className="section-title">
            정보융합학부 CHIC (Computer Human Interaction Community)
            <br />
            😊 신규회원 모집 😊
          </h2>
          <p className="section-description">
            CHIC에서 2025년을 함께할 신규 회원을 모집하고 있습니다!
          </p>
          <ul className="info-list">
            <li>
              <span className="info-icon">📌</span>
              <strong>모집 기간</strong>: 1월 31일 ~ 2월 12일
            </li>
            <li>
              <span className="info-icon">📌</span>
              <strong>모집 인원</strong>: 00명
            </li>
            <li>
              <span className="info-icon">📌</span>
              <strong>모집 대상</strong>: 정보융합학부 2, 3학년
            </li>
            <li>
              <span className="info-icon">📌</span>
              <strong>회비</strong>: 2만원 (회식, 아이디어톤에 사용 예정)
            </li>
            <li>
              <span className="info-icon">📌</span>
              <strong>결과 발표</strong>: 구글폼에 작성한 메일로 전달될
              예정입니다.
            </li>
            <li>
              <span className="info-icon">📌</span>
              <strong>개강 미팅</strong>: 합격자분들은 3월 4일 오후 5시 CHIC
              개강 미팅이 예정이니 참고해주시면 감사하겠습니다.
            </li>
          </ul>
        </section>

        <section className="recruit-section">
          <h2 className="section-title">🌟 CHIC 활동 혜택</h2>
          <ol className="benefit-list">
            <li>
              <strong>팀 단위의 스터디 진행</strong>
              <p className="left-align">
                전공과 관련한 다양한 분야의 스터디를 진행합니다. 팀원들과
                협력하며 지식을 공유하고 성장할 수 있는 학습 기회를 얻을 수
                있습니다.
              </p>
            </li>
            <li>
              <strong>다양한 프로젝트 진행</strong>
              <p className="left-align">
                스터디를 통해 학습한 내용을 토대로 프로젝트를 진행합니다. 다양한
                실무형 프로젝트를 통해 실질적인 경험을 쌓을 수 있습니다. 지난
                스터디와 프로젝트 주제가 궁금하다면{" "}
                <a
                  href="https://github.com/CHIC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                >
                  CHIC 깃허브 레포지토리
                </a>
                를 확인해주세요.
              </p>
            </li>
            <li>
              <strong>선후배 네트워크 형성</strong>
              <p className="left-align">
                선후배 간의 교류를 통해 유익한 조언과 정보를 얻을 수 있습니다.
                😎
              </p>
            </li>
            <li>
              <strong>세미나 진행</strong>
              <p className="left-align">
                비정기적으로 진행되는 세미나를 통해 다양한 인사이트와 지식을
                얻을 수 있습니다.
              </p>
            </li>
            <li>
              <strong>아이디어톤 개최</strong>
              <p className="left-align">
                여름방학 동안 진행되는 아이디어톤에서 창의적인 아이디어를
                개발하고 발표할 수 있습니다.
              </p>
            </li>
            <li>
              <strong>참빛 포인트 지급</strong>
              <p className="left-align">
                CHIC는 광운대학교 비교과 프로그램으로서, 활동 시 참빛 포인트를
                받을 수 있습니다.
              </p>
            </li>
            <li>
              <strong>회식</strong>
              <p className="left-align">
                팀원들과 친목을 도모하며 즐거운 시간을 보낼 수 있는 회식을
                진행합니다. 😎🍗
              </p>
            </li>
          </ol>
        </section>

        <section className="recruit-section">
          <h2 className="section-title">💬 문의 및 링크</h2>
          <p className="center-align">
            위 내용 외에 궁금한 점이 있으시다면?{" "}
            <a
              href="https://open.kakao.com/o/CHIC"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              CHIC 오픈채팅
            </a>
            을 통해 질문해주세요! <br />
            시크 동아리 활동에 대해 더 궁금하다면?{" "}
            <a
              href="https://instagram.com/chic_stg"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              인스타그램
            </a>
            과{" "}
            <a
              href="https://github.com/CHIC"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              깃허브
            </a>
            를 참고해주세요! 🫶
          </p>
        </section>

        {/* 지원서 폼 */}
        <form onSubmit={handleSubmit} className="recruit-form">
          <div className="form-group">
            <label>이름</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>학번 (ex. 2024404000)</label>
            <input
              type="text"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>이수학기</label>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              required
            >
              <option value="">선택하세요</option>
              <option value="2학기">2학기</option>
              <option value="3학기">3학기</option>
              <option value="4학기">4학기</option>
              <option value="5학기">5학기</option>
              <option value="기타">기타</option>
            </select>
          </div>
          <div className="form-group">
            <label>이메일 (ex. chic1234@naver.com)</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>전화번호 (ex. 010-1234-5678)</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>관심분야</label>
            <div className="checkbox-group">
              {[
                "웹개발",
                "앱개발",
                "프론트엔드",
                "백엔드",
                "데이터 분석",
                "UX/UI디자인",
                "사물인터넷(IoT)",
                "인공지능/머신러닝",
                "VR/AR",
                "기타",
              ].map((interest) => (
                <label key={interest}>
                  <input
                    type="checkbox"
                    name="interests"
                    value={interest}
                    checked={formData.interests.includes(interest)}
                    onChange={handleChange}
                  />
                  {interest}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>
              활동 예정 기간 (휴학 예정, 군 입대 등 활동에 영향을 미칠 수 있는
              활동이 있다면 적어주세요.)
            </label>
            <textarea
              name="activityPeriod"
              value={formData.activityPeriod}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>
              자기소개 (학년, 프로젝트 진행 경험, 과목 수강 경험 등 모든 관련
              경험)
            </label>
            <textarea
              name="introduction"
              value={formData.introduction}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>
              CHIC에서 배우고 싶거나 이루고 싶은 목표 (ex. 들어와서 하고 싶은
              활동)
            </label>
            <textarea
              name="goals"
              value={formData.goals}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>
              협업에 대한 생각 (다른 팀원들과 협업 시 가장 중요하다고 생각하는
              것은 무엇인지)
            </label>
            <textarea
              name="collaboration"
              value={formData.collaboration}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>기타 질문 또는 하고 싶은 말</label>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
            />
          </div>

          {/* 제출 버튼 */}
          <button
            type="submit"
            className="submit-button"
            disabled={
              !formData.name ||
              !formData.studentId ||
              !formData.semester ||
              !formData.email ||
              !formData.phone ||
              formData.interests.length === 0 ||
              !formData.activityPeriod ||
              !formData.introduction ||
              !formData.goals ||
              !formData.collaboration
            }
          >
            제출하기
          </button>
        </form>
      </div>
    </>
  );
};

export default Recruit;
