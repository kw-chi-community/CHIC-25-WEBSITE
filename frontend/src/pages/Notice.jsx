import React, { useState, useEffect } from "react";
import { FaPlus, FaTimes, FaEdit } from "react-icons/fa";
import Banner from "../components/Banner";
import Icons from "../components/Icons";
import "../styles/Notice.css";
import ReactGA4 from "react-ga4";
import { useNavigate, useLocation } from "react-router-dom";

const Notice = () => {
  const location = useLocation();
  const address = process.env.REACT_APP_BACKEND_ADDRESS;

  const [userId, setUserId] = useState(null);
  const [userNickname, setUserNickname] = useState(null);
  const [userStatus, setUserStatus] = useState(null);

  const [notices, setNotices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNotices, setFilteredNotices] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentNoticeId, setCurrentNoticeId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const checkAccessToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(`${address}/verify`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (result.success) {
        setUserId(result.user.userId);
        setUserNickname(result.user.userNickname);
        setUserStatus(result.user.userStatus);
      }
    } catch (error) {
      console.error("토큰 검증 중 오류 발생:", error);
      localStorage.removeItem("token");
    }
  };

  const fetchNotices = async () => {
    try {
      const response = await fetch(`${address}/posts?type=notice`);
      const data = await response.json();
      setNotices(data);
      setFilteredNotices(data);
    } catch (error) {
      console.error("공지사항 불러오기 실패:", error);
    }
  };

  const handleDeleteNotice = async (postId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${address}/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("공지사항 삭제 실패");

      alert("공지사항이 삭제되었습니다.");
      fetchNotices();
    } catch (error) {
      console.error("공지사항 삭제 중 오류:", error);
      alert("공지사항 삭제에 실패했습니다.");
    }
  };

  const handleCreateNotice = async () => {
    if (!newTitle || !newContent) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const method = isEditing ? "PUT" : "POST";
      const url = isEditing
        ? `${address}/posts/${currentNoticeId}`
        : `${address}/posts`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: userId,
          nickName: userNickname,
          title: newTitle,
          content: newContent,
          type: "notice",
        }),
      });

      if (!response.ok) throw new Error("공지사항 작성 실패");

      setShowModal(false);
      setNewTitle("");
      setNewContent("");
      setIsEditing(false);
      setCurrentNoticeId(null);
      alert(
        isEditing ? "공지사항이 수정되었습니다." : "공지사항이 등록되었습니다."
      );
      fetchNotices();
    } catch (error) {
      console.error("공지사항 작성 중 오류:", error);
      alert("공지사항 작성에 실패했습니다.");
    }
  };

  const openEditModal = (notice) => {
    setNewTitle(notice.title);
    setNewContent(notice.content);
    setCurrentNoticeId(notice.postId);
    setIsEditing(true);
    setShowModal(true);
  };

  useEffect(() => {
    checkAccessToken();
    fetchNotices();
    ReactGA4.send({
      hitType: "pageview",
      page: location.pathname + location.search,
      title: "Notice",
    });
  }, [location]);

  useEffect(() => {
    const filtered = notices.filter((notice) =>
      notice.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredNotices(filtered);
  }, [searchQuery, notices]);

  return (
    <>
      <Banner />
      <Icons />
      <div className="notice-container">
        <div className="notice-header">
          <div className="notice-search-bar">
            <input
              type="text"
              placeholder="공지사항 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {userStatus === "executive" || userStatus === "superadmin" ? (
            <button
              className="notice-create-btn"
              onClick={() => {
                setShowModal(true);
                setIsEditing(false);
                setNewTitle("");
                setNewContent("");
              }}
            >
              <FaPlus />
            </button>
          ) : null}
        </div>

        <ul className="notice-list">
          {filteredNotices.map((notice) => (
            <li key={notice.postId} className="notice-item">
              {(userStatus === "superadmin" || userStatus === "executive") && (
                <button
                  className="notice-delete-btn"
                  onClick={() => handleDeleteNotice(notice.postId)}
                >
                  <FaTimes />
                </button>
              )}

              <div style={{ display: "flex", alignItems: "center" }}>
                <h3 className="notice-title">{notice.title}</h3>
                {(userStatus === "superadmin" ||
                  userStatus === "executive") && (
                  <FaEdit
                    className="notice-edit-icon"
                    onClick={() => openEditModal(notice)}
                    style={{
                      marginLeft: "8px",
                      cursor: "pointer",
                      color: "white",
                    }}
                  />
                )}
              </div>
              <p className="notice-content">{notice.content}</p>
              <div className="notice-date">
                작성자: {notice.nickName} / 작성일:{" "}
                {new Date(notice.createdAt).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{isEditing ? "공지사항 수정" : "공지사항 작성"}</h3>
            <input
              type="text"
              placeholder="제목"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <textarea
              placeholder="내용"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
            />
            <div className="modal-buttons">
              <button onClick={handleCreateNotice}>
                {isEditing ? "수정" : "등록"}
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setIsEditing(false);
                  setNewTitle("");
                  setNewContent("");
                }}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Notice;
