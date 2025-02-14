import React, { useState } from "react";
import { FaHeart, FaComment, FaStar } from "react-icons/fa";
import { FaPencilAlt, FaCheck, FaImage } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import "../styles/CreateArticle.css";

const CreateArticle = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);

  const handleEditClick = () => setIsEditing(true);
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);

  const handleSubmit = () => {
    if (title.trim() === "" || content.trim() === "") return;
    const newPost = {
      title,
      content,
      likes: 0,
      comments: 0,
      views: 0,
      createdAt: new Date(),
    };
    setPosts([newPost, ...posts]);
    handleCancel();
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setIsEditing(false);
  };

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
