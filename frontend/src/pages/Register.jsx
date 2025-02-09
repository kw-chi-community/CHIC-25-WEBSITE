import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../components/Banner";
import "../styles/Register.css";

const Register = () => {
  const address = process.env.REACT_APP_BACKEND_ADDRESS;

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    nickname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await fetch(`${address}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: formData.username,
          password: formData.password,
          nickName: formData.nickname,
        }),
      });

      const result = await response.json();
      console.log(result);
      if (!response.ok) {
        throw new Error(result.message || "회원가입 요청이 실패했습니다.");
      }

      alert("회원가입 신청이 완료되었습니다! 로그인 페이지로 이동합니다.");
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      setError("회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <Banner />
      <div className="register-container">
        <h1>계정 생성하기</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>아이디 *</label>
            <input
              type="text"
              name="username"
              placeholder="아이디"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>닉네임 *</label>
            <input
              type="text"
              name="nickname"
              placeholder="닉네임"
              value={formData.nickname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>비밀번호 *</label>
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>비밀번호 확인 *</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="비밀번호 확인"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit">회원가입</button>
        </form>
      </div>
    </>
  );
};

export default Register;
