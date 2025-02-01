// routes/replyRoute.js

const express = require("express");
const router = express.Router();
const replyController = require("../controllers/replyController");

router.post("/", replyController.createReply); // 댓글 작성
router.get("/:postId", replyController.getRepliesByPost); // 특정 게시글의 댓글 조회

module.exports = router;
