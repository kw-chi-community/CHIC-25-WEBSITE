import React, { useState, useEffect } from "react";
import { FaHeart, FaComment, FaStar } from "react-icons/fa";
import { FaPencilAlt, FaCheck, FaImage } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import "../styles/CreateArticle.css";

const address = process.env.REACT_APP_BACKEND_ADDRESS;

const checkAccessToken = async (setUserId, setUserNickname) => {
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
        setUserId(result.user.userId);
        setUserNickname(result.user.userNickname);
      }
    } catch (error) {
      console.error("토큰 검증 중 오류 발생:", error);
      localStorage.removeItem("token");
      window.location.href = "/freeboard";
    }
  }
};

const CreateArticle = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);

  const [userId, setUserId] = useState(null);
  const [userNickname, setUserNickname] = useState(null);

  const handleEditClick = () => setIsEditing(true);
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);

  const handleSubmit = async () => {
    if (title.trim() === "" || content.trim() === "") return;
    const data = {
      id: userId,
      nickName: userNickname,
      title,
      content,
      tags: [],
    };
    try {
      const response = await fetch(`${address}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("게시글 작성 실패");
      }
      const newPost = await response.json();
      console.log("작성된 게시글:", newPost);
      handleCancel();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setIsEditing(false);
  };

  useEffect(() => {
    checkAccessToken(setUserId, setUserNickname);
  }, []);

  return (
    <div className="create-article-container">
      <div className="create-article">
        {isEditing ? (
          <div className="input-wrapper">
            <AiOutlineClose
              className="cancel-icon top-right"
              onClick={handleCancel}
            />
            <input
              type="text"
              placeholder="글 제목을 입력하세요"
              value={title}
              onChange={handleTitleChange}
              autoFocus
            />
            <textarea
              placeholder="글 내용을 입력하세요"
              value={content}
              onChange={handleContentChange}
            />
            <div className="bottom-area">
              <FaImage className="image-icon" />
              <FaCheck
                className="submit-icon bottom-right"
                onClick={handleSubmit}
              />
            </div>
          </div>
        ) : (
          <div className="placeholder" onClick={handleEditClick}>
            <span>제목을 작성해주세요</span>
            <FaPencilAlt className="edit-icon" />
          </div>
        )}
      </div>

      <div className="post-list">
        {posts.map((post, index) => (
          <div key={index} className="post-item">
            <strong className="post-title">{post.title}</strong>
            <p className="post-content">{post.content}</p>

            <div className="post-stats-icons">
              <span className="icon-item">
                <FaHeart /> <span>{post.likes}</span>
              </span>
              <span className="icon-item">
                <FaComment /> <span>{post.comments}</span>
              </span>
              <span className="icon-item">
                <FaStar /> <span>{post.views}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateArticle;
