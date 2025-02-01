// controllers/replyController.js

const Reply = require("../models/reply");
const { v4: uuidv4 } = require("uuid");

// 댓글 추가
exports.createReply = async (req, res) => {
  try {
    const { postId, id, nickName, content, parentReplyId } = req.body;
    const newReply = new Reply({
      replyId: uuidv4(),
      postId,
      id,
      nickName,
      content,
      parentReplyId: parentReplyId || null, // 대댓글이면 부모 댓글 ID 추가
      createdAt: new Date(),
    });

    await newReply.save();
    res.status(201).json(newReply);
  } catch (error) {
    res.status(500).json({ message: "댓글 작성 실패" });
  }
};

// 특정 게시글의 댓글 조회
exports.getRepliesByPost = async (req, res) => {
  try {
    const replies = await Reply.find({ postId: req.params.postId });
    res.status(200).json(replies);
  } catch (error) {
    res.status(500).json({ message: "댓글 조회 실패" });
  }
};
