import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../components/Banner";
import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.username === "admin" && formData.password === "1234") {
      alert("로그인 성공! 홈 화면으로 이동합니다.");
      navigate("/");
    } else {
      setError("아이디 또는 비밀번호가 잘못되었습니다.");
    }
  };

  return (
    <>
      <Banner />
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="id
            "
            placeholder="id"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit">Login</button>
          <button
            className="signup-button"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
