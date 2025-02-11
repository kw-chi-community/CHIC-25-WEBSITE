// routes/postRoute.js

const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.get("/", postController.getPosts); // 모든 게시글 조회
router.get("/:postId", postController.getPostById); // 특정 게시글 조회
router.post("/", postController.createPost); // 게시글 작성
router.put("/:postId", postController.updatePost); // 게시글 수정
router.delete("/:postId", postController.deletePost); // 게시글 삭제

module.exports = router;
