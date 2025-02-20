// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const tempUser = require("../models/tempuser");
const rejectedUser = require("../models/rejecteduser");
const jwt = require("jsonwebtoken");
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

// 토큰 유효성 검증 엔드포인트
// router.get("/validate", authController.validateToken);

// 회원가입 엔드포인트
router.post("/signup", authController.register);

// 로그인 엔드포인트
router.post("/login", authController.login);

// // 닉네임 중복 체크 엔드포인트
// router.get("/check-nickname", authController.checkNicknameAvailability);

// 아이디 중복 체크 엔드포인트
router.get("/check-id", authController.checkIdAvailability);

// 토큰 검증
router.get("/verify", authMiddleware, authController.verifyToken);

// 회원가입 대기 엔드포인트
router.get("/get-temp-users", authController.getTempUsers);
// 회원가입 승인 엔드포인트
router.get("/approve", authController.approveUser);
// 회원가입 거절 엔드포인트
router.get("/reject", authController.rejectUser);

// 유저 정보 조회 엔드포인트(토큰 필요)
router.get("/me", authMiddleware, authController.getUserInfo);

// 모든 유저 목록 조회 엔드포인트 (executive, superadmin만 접근 가능)
router.get("/users", authMiddleware, authController.getAllUsers);

// 유저 상태 변경 (superadmin만)
router.patch("/users/:id/status", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    if (req.user.status !== "executive" && req.user.status !== "superadmin") {
      return res.status(403).json({ message: "권한이 없습니다." });
    }

    const user = await User.findOneAndUpdate({ id }, { status }, { new: true });

    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    res.status(200).json({ message: "상태 변경 성공", user });
  } catch (error) {
    res.status(500).json({ message: "상태 변경 실패", error });
  }
});

// // 유저 정보 수정 엔드포인트
// router.patch("/me", authMiddleware, authController.updateUserInfo);

module.exports = router;
