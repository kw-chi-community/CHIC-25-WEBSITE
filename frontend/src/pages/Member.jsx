import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import "../styles/Member.css";

const Member = () => {
  const [users, setUsers] = useState([]);
  const [currentUserStatus, setCurrentUserStatus] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null); // 현재 로그인한 유저 id도 추가
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const address = process.env.REACT_APP_BACKEND_ADDRESS;

  // 유저 목록 불러오기
  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${address}/users`, {
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

  // 현재 로그인한 유저 상태 가져오기
  const fetchCurrentUserStatus = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${address}/verify`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (result.success) {
        setCurrentUserStatus(result.user.userStatus);
        setCurrentUserId(result.user.userId); // 로그인한 유저 id도 설정
      } else {
        throw new Error("유저 상태 가져오기 실패");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchCurrentUserStatus();
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>오류 발생: {error}</p>;

  // 상태 변경 핸들러 (백엔드 PATCH 요청)
  const handleStatusChange = async (userId, newStatus) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${address}/users/${userId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("상태 변경 실패");
      }

      alert("상태가 변경되었습니다.");
      fetchUsers();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="member-container">
      <Banner />
      <h2 className="member-title">회원 관리</h2>
      <table className="member-table">
        <thead>
          <tr>
            <th>아이디</th>
            <th>닉네임</th>
            <th>상태</th>
            <th>상태 변경</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.id}</td>
              <td>{user.nickName}</td>
              <td>{user.status}</td>
              <td>
                <select
                  value={user.status}
                  onChange={(e) =>
                    handleStatusChange(user.id, e.target.value)
                  }
                  disabled={
                    currentUserStatus !== "superadmin" || currentUserId === user.id
                  }
                >
                  <option value="user">user</option>
                  <option value="member">member</option>
                  <option value="executive">executive</option>
                  <option value="superadmin">superadmin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Member;
