// models/tempuser.js

const mongoose = require("mongoose");

const tempuserSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // 해시 형태로 저장
  nickName: { type: String, required: true, unique: true },
  isAdmin: { type: Boolean, default: false }, // 기본값 false
  status: {
    type: String,
    enum: ["normal", "manager", "professor"], // 상태 값 단순화
    default: "normal",
  },
  profileImage: { type: String, default: null }, // 프로필 이미지 URL
  achievements: { type: [String], default: [] }, // 업적
  interests: { type: [String], default: [] }, // 관심사
});

const tempUser = mongoose.model("tempUser", tempuserSchema);

module.exports = tempUser;
