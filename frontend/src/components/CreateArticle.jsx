import React, { useState, useEffect } from "react";
import {
  FaHeart,
  FaComment,
  FaPencilAlt,
  FaCheck,
  FaImage,
} from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "../styles/CreateArticle.css";
import ReplySection from "../components/ReplySection";

const address = process.env.REACT_APP_BACKEND_ADDRESS;

const CreateArticle = ({ selectedPostId, setSelectedPostId }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userNickname, setUserNickname] = useState(null);
  const [userStatus, setUserStatus] = useState(null);
  const [likedPosts, setLikedPosts] = useState(new Set());

  const checkAccessToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(`${address}/verify`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await response.json();
      if (result.success) {
        setUserId(result.user.userId);
        setUserNickname(result.user.userNickname);
        setUserStatus(result.user.userStatus);
      } else {
        localStorage.removeItem("token");
      }
    } catch (error) {
      localStorage.removeItem("token");
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${address}/posts?type=board`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("게시글 가져오기 실패");

      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("게시글 불러오기 오류:", error);
    }
  };

  const handleViewComments = (postId) => {
    setSelectedPostId(postId);
    navigate(`/freeboard/${postId}`);
  };

  const handleDelete = async (postId, postUserId) => {
    if (userId !== postUserId) {
      alert("본인이 작성한 글만 삭제할 수 있습니다.");
      return;
    }

    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      const response = await fetch(`${address}/posts/${postId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("게시글 삭제 실패");
      fetchPosts();
    } catch (error) {
      console.error("게시글 삭제 오류:", error);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setIsEditing(false);
  };

  const handleLike = async (postId) => {
    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }

    console.log("좋아요 요청 postId:", postId, "userId:", userId);

    try {
      const response = await fetch(`${address}/posts/${postId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }), // 사용자 ID 추가
      });

      if (!response.ok) throw new Error("좋아요 실패");

      const data = await response.json();

      // 좋아요 UI 업데이트
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.postId === postId
            ? { ...post, likes: data.likes, likedUsers: data.likedUsers }
            : post
        )
      );
    } catch (error) {
      console.error("좋아요 처리 오류:", error);
    }
  };

  const handleSubmit = async () => {
    if (title.trim() === "" || content.trim() === "") return;
    const data = {
      id: userId,
      nickName: userNickname,
      title,
      content,
      tags: [],
      type: "board",
    };

    try {
      const response = await fetch(`${address}/posts?type=board`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("게시글 작성 실패");

      handleCancel();
      fetchPosts();
    } catch (error) {
      console.error("게시글 작성 오류:", error);
    }
  };

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const handleEditClick = () => {
    if (!userStatus) {
      alert("작성 권한이 없습니다.");
      return;
    }
    setIsEditing(true);
  };

  useEffect(() => {
    checkAccessToken();
    fetchPosts();
  }, []);

  return (
    <div className="create-article-container">
      {selectedPostId ? (
        <ReplySection
          postId={selectedPostId}
          userId={userId}
          userNickname={userNickname}
        />
      ) : (
        <>
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
            {posts.map((post) => (
              <div key={post.postId} className="post-item">
                <div className="post-header">
                  <strong className="post-title">{post.title}</strong>
                  {post.id === userId && (
                    <AiOutlineClose
                      className="delete-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(post.postId, post.id);
                      }}
                    />
                  )}
                </div>
                <p className="post-content">{post.content}</p>
                <div className="post-stats-icons">
                  <span
                    className="icon-item"
                    onClick={() => handleLike(post.postId)}
                  >
                    <FaHeart
                      style={{
                        color: (post.likedUsers || []).includes(userId)
                          ? "red"
                          : "black",
                      }}
                    />

                    <span>{post.likes}</span>
                  </span>
                  <span
                    className="icon-item comment-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewComments(post.postId);
                    }}
                  >
                    <FaComment /> <span>{post.comments}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CreateArticle;
