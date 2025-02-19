import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../components/Banner";
import "../styles/Login.css";

const Login = () => {
  const address = process.env.REACT_APP_BACKEND_ADDRESS;
  const checkAccessToken = async () => {
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
          alert("이미 로그인되어 있습니다.");
          navigate("/");
          //setUserId(result.user.userId);
          //setUserNickname(result.user.userNickname);
        }
      } catch (error) {
        console.error("토큰 검증 중 오류 발생:", error);
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
  };

  useEffect(() => {
    checkAccessToken();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${address}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: formData.id,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        // 서버에서 에러 메시지를 보냈을 경우 처리
        throw new Error(result.error || "로그인이 실패했습니다");
      }

      if (result.token) {
        localStorage.setItem("token", result.token); // 토큰 저장
        alert("로그인 성공! 홈 화면으로 이동합니다.");
        navigate("/");
      } else {
        //alert(result.message); // 실패 메시지 표시

        setError(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
      alert("로그인이 실패했습니다.");
    }

    // 여기에 로그인 처리
    /*
    if (formData.username === "admin" && formData.password === "1234") {
      alert("로그인 성공! 홈 화면으로 이동합니다.");
      navigate("/");
    } else {
      setError("아이디 또는 비밀번호가 잘못되었습니다.");
    }
      */
  };

  return (
    <>
      <Banner />
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="id"
            placeholder="id"
            value={formData.id}
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
            type="button"
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
