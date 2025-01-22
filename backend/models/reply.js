// models/reply.js
const mongoose = require("mongoose");

// 댓글 스키마 설계
const replySchema = new mongoose.Schema({
  replyId: { type: String, required: true, unique: true }, // 댓글 고유 아이디
  postId: { type: String, required: true }, // 해당 댓글이 속한 게시글 ID
  id: { type: String, required: true }, // 작성자 식별자 (User 스키마의 id)
  parentReplyId: { type: String, ref: "Reply", default: null }, // 대댓글용 부모 댓글 ID
  nickName: { type: String, required: true }, // 작성자 닉네임
  content: { type: String, required: true }, // 댓글 내용
  likes: { type: Number, default: 0 }, // 댓글의 좋아요 수
  createdAt: { type: Date, required: true }, // 댓글 작성 시간
  updatedAt: { type: Date, default: null }, // 댓글 수정 시간
});

// 댓글 모델 생성
const Reply = mongoose.model("Reply", replySchema);

// 내보내기
module.exports = Reply;
