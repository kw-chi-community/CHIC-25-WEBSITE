// controllers/postController.js

const Post = require("../models/post");
const { v4: uuidv4 } = require("uuid");

// 모든 게시글 조회
exports.getPosts = async (req, res) => {
  try {
    const posttype = req.query.type ? { type: req.query.type } : {};
    const posts = await Post.find(posttype).sort({ createdAt: -1 });
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

// 게시글 좋아요 처리
exports.likePost = async (req, res) => {
  try {
    console.log("좋아요 요청 postId:", req.params.postId, "userId:", req.body.userId);

    const { postId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "사용자 ID가 필요합니다." });
    }

    const post = await Post.findOne({ postId });

    if (!post) {
      console.log("게시글을 찾을 수 없음:", postId);
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }

    // 사용자가 이미 좋아요를 눌렀는지 확인
    const userIndex = post.likedUsers.indexOf(userId);

    if (userIndex === -1) {
      // 좋아요 추가
      post.likes += 1;
      post.likedUsers.push(userId);
    } else {
      // 좋아요 취소
      post.likes -= 1;
      post.likedUsers.splice(userIndex, 1);
    }

    await post.save();

    res.status(200).json({ message: "좋아요 상태 변경", likes: post.likes, likedUsers: post.likedUsers });
  } catch (error) {
    console.error("좋아요 처리 실패:", error);
    res.status(500).json({ message: "좋아요 처리 실패" });
  }
};
