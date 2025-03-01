// models/post.js
const mongoose = require("mongoose");

// 게시글 스키마 설계
const postSchema = new mongoose.Schema({
  postId: { type: String, required: true, unique: true }, // 게시글 고유 아이디
  id: { type: String, required: true }, // 작성자 식별자 (User 스키마의 id)
  nickName: { type: String, required: true }, // 작성자 닉네임
  title: { type: String, required: true }, // 게시글 제목
  content: { type: String, required: true }, // 게시글 내용
  tags: { type: [String], default: [] }, // 태그 리스트
  viewCount: { type: Number, default: 0 }, // 조회수
  likes: { type: Number, default: 0 }, // 좋아요 수
  likedUsers: { type: [String], default: [] }, // 좋아요 사용자 리스트
  createdAt: { type: Date, required: true }, // 댓글 작성 시간
  updatedAt: { type: Date, default: null }, // 댓글 수정 시간

  //공지사항 재활용을 위한 type
  type: {
    type: String,
    enum: ["notice", "board"],
    default: "board", 
  },
});

// 게시글 모델 생성
const Post = mongoose.model("Post", postSchema);

// 내보내기
module.exports = Post;
