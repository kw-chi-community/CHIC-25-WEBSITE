//import React from "react";
import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";

const Application = () => {
  const [users, setUsers] = useState([]);
  //const [currentUserStatus, setCurrentUserStatus] = useState(null);
  //const [currentUserId, setCurrentUserId] = useState(null); // 현재 로그인한 유저 id도 추가
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const address = process.env.REACT_APP_BACKEND_ADDRESS;

  // 유저 목록 불러오기
  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${address}/tempusers`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("회원 목록 불러오기 실패");
      }

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>오류 발생: {error}</p>;

  // 상태 변경 핸들러 (백엔드 PATCH 요청)
  const handleApprove = async (userId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${address}/approve`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: userId }),
      });

      if (!response.ok) {
        throw new Error("승인 처리 실패");
      }

      alert("회원이 승인되었습니다.");
      fetchUsers(); // 목록 갱신
    } catch (err) {
      alert(err.message);
    }
  };

  const handleReject = async (userId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${address}/reject`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: userId }),
      });

      if (!response.ok) {
        throw new Error("거절 처리 실패");
      }

      alert("회원이 거절되었습니다.");
      fetchUsers(); // 목록 갱신
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <div>
      <Banner />
      <div className="member-container">
        <h2 className="member-title">회원가입 신청 관리</h2>
        <table className="member-table">
          <thead>
            <tr>
              <th>아이디</th>
              <th>닉네임</th>
              <th>승인</th>
              <th>거절</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.id}</td>
                <td>{user.nickName}</td>
                <td>
                  <button onClick={() => handleApprove(user.id)}>승인</button>
                </td>
                <td>
                  <button onClick={() => handleReject(user.id)}>거절</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Application;
