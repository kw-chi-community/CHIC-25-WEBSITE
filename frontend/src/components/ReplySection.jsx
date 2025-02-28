import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/ReplySection.css";
import ReactGA4 from "react-ga4";

const address = process.env.REACT_APP_BACKEND_ADDRESS;

const ReplySection = ({ postId: propPostId, userId, userNickname }) => {
  // URL의 postId와 props의 postId를 비교하여, props가 있으면 우선 사용
  const { postId: paramPostId } = useParams();
  const postId = propPostId || paramPostId;

  const [post, setPost] = useState(null);
  const [replies, setReplies] = useState([]);
  const [replyContent, setReplyContent] = useState("");

  useEffect(() => {
    if (postId) {
      fetchPostDetails();
      fetchReplies();
    }
  }, [postId]);

  const fetchPostDetails = async () => {
    try {
      console.log("🔍 게시글 정보 가져오기 요청:", `${address}/posts/${postId}`);
      const response = await fetch(`${address}/posts/${postId}`);
      if (!response.ok) {
        console.error("❌ 게시글 불러오기 실패. 상태 코드:", response.status);
        throw new Error("게시글 불러오기 실패");
      }
      const data = await response.json();
      console.log("✅ 게시글 데이터:", data);
      setPost(data);
    } catch (error) {
      console.error("❌ 게시글 정보 오류:", error);
    }
  };

  const fetchReplies = async () => {
    try {
      const response = await fetch(`${address}/replies/${postId}`);
      if (!response.ok) throw new Error("댓글 조회 실패");
      const data = await response.json();
      setReplies(data);
    } catch (error) {
      console.error("댓글 불러오기 오류:", error);
    }
  };

  const handleReplySubmit = async () => {
    if (!replyContent.trim()) {
      alert("댓글 내용을 입력하세요.");
      return;
    }

    if (!postId || !userId || !userNickname) {
      console.error("❌ 필수 데이터 누락!", {
        postId,
        userId,
        userNickname,
        content: replyContent,
      });
      alert("로그인 후 댓글을 작성할 수 있습니다.");
      return;
    }

    const data = {
      postId,
      id: userId,
      nickName: userNickname,
      content: replyContent,
    };

    console.log("✅ 댓글 작성 요청 데이터:", data);

    try {
      const response = await fetch(`${address}/replies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ 서버 응답 오류:", errorData);
        throw new Error("댓글 작성 실패");
      }

      setReplyContent("");
      await fetchReplies();
    } catch (error) {
      console.error("❌ 댓글 작성 오류:", error);
      alert("댓글 작성에 실패했습니다.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleReplySubmit();
    }
  };

  return (
    <div className="reply-section">
      {post ? (
        <div className="post-detail">
          <h2 className="post-title">{post.title}</h2>
          <p className="post-content">{post.content}</p>
        </div>
      ) : (
        <p className="loading-message">게시글을 불러오는 중...</p>
      )}

      <h3 className="reply-title">댓글</h3>
      <div className="reply-list">
        {replies.length > 0 ? (
          replies.map((reply) => (
            <div key={reply.replyId} className="reply-item">
              <strong>{reply.nickName}</strong>
              <p>{reply.content}</p>
            </div>
          ))
        ) : (
          <p className="no-reply-message">아직 댓글이 없습니다.</p>
        )}
      </div>

      <div className="reply-input-container">
        <textarea
          className="reply-input"
          placeholder="댓글을 입력하세요..."
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div>
    </div>
  );
};

export default ReplySection;
