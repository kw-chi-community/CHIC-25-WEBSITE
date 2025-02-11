// routes/userApprovalRoute.js;

const express = require("express");
const router = express.Router();
const userApprovalController = require("../controllers/userApprovalController");
const authMiddleware = require("../middlewares/authMiddleware"); // 관리자 인증용 미들웨어

// 가입 요청 목록 조회 (관리자만) --> 일단
router.get("/pending", authMiddleware, userApprovalController.getPendingUsers);

// 가입 승인
router.post("/approve/:id", authMiddleware, userApprovalController.approveUser);

// 가입 거절
router.post("/reject/:id", authMiddleware, userApprovalController.rejectUser);

// 거절된 사용자 목록 조회
router.get(
  "/rejected",
  authMiddleware,
  userApprovalController.getRejectedUsers
);

module.exports = router;
