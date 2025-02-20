// controllers/postController.js

const Post = require("../models/post");
const { v4: uuidv4 } = require("uuid");

// 모든 게시글 조회
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "게시글 조회 실패" });
  }
};

// 단일 게시글 조회
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findOne({ postId: req.params.postId });
    if (!post)
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });

    post.viewCount += 1;
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "게시글 조회 실패" });
  }
};

// 게시글 생성
exports.createPost = async (req, res) => {
  try { 
    const { id, nickName, title, content, tags, type } = req.body;
    const newPost = new Post({
      postId: uuidv4(),
      id,
      nickName,
      title,
      content,
      tags,
      type,
      createdAt: new Date(),
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "게시글 생성 실패" });
  }
};

// 게시글 수정
exports.updatePost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const post = await Post.findOne({ postId: req.params.postId });

    if (!post)
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });

    post.title = title || post.title;
    post.content = content || post.content;
    post.tags = tags || post.tags;
    post.updatedAt = new Date();

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "게시글 수정 실패" });
  }
};

// 게시글 삭제
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({ postId: req.params.postId });
    if (!post)
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });

    res.status(200).json({ message: "게시글이 삭제되었습니다." });
  } catch (error) {
    res.status(500).json({ message: "게시글 삭제 실패" });
  }
};
