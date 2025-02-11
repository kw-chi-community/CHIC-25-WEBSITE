// controllers/userApprovalController.js

const TempUser = require("../models/tempuser");
const RejectedUser = require("../models/rejecteduser");
const User = require("../models/user");
const bcrypt = require("bcrypt");

// 모든 가입 요청 조회
exports.getPendingUsers = async (req, res) => {
  try {
    const pendingUsers = await TempUser.find();
    res.status(200).json(pendingUsers);
  } catch (error) {
    res.status(500).json({ message: "가입 요청 목록을 가져올 수 없습니다." });
  }
};

// 가입 승인
exports.approveUser = async (req, res) => {
  try {
    const { id } = req.params;
    const tempUser = await TempUser.findOne({ id });

    if (!tempUser) {
      return res.status(404).json({ message: "가입 요청을 찾을 수 없습니다." });
    }

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(tempUser.password, 10);

    // User 컬렉션으로 이동
    const newUser = new User({
      id: tempUser.id,
      password: hashedPassword,
      nickName: tempUser.nickName,
      isAdmin: tempUser.isAdmin,
      status: tempUser.status,
      profileImage: tempUser.profileImage,
      achievements: tempUser.achievements,
      interests: tempUser.interests,
    });

    await newUser.save();
    await TempUser.deleteOne({ id });

    res.status(200).json({ message: "가입이 승인되었습니다.", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "가입 승인 실패" });
  }
};

// 가입 거절
exports.rejectUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    const tempUser = await TempUser.findOne({ id });

    if (!tempUser) {
      return res.status(404).json({ message: "가입 요청을 찾을 수 없습니다." });
    }

    // RejectedUser 컬렉션으로 이동
    const rejectedUser = new RejectedUser({
      id: tempUser.id,
      password: tempUser.password, // 해싱 없이 저장 (로그인 X)
      nickName: tempUser.nickName,
      isAdmin: tempUser.isAdmin,
      status: tempUser.status,
      profileImage: tempUser.profileImage,
      achievements: tempUser.achievements,
      interests: tempUser.interests,
      reason,
    });

    await rejectedUser.save();
    await TempUser.deleteOne({ id });

    res.status(200).json({ message: "가입이 거절되었습니다.", rejectedUser });
  } catch (error) {
    res.status(500).json({ message: "가입 거절 실패" });
  }
};

// 거절된 사용자 목록 조회
exports.getRejectedUsers = async (req, res) => {
  try {
    const rejectedUsers = await RejectedUser.find();
    res.status(200).json(rejectedUsers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "거절된 사용자 목록을 가져올 수 없습니다." });
  }
};
