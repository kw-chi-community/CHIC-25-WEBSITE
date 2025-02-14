// controllers/authController.js
require("dotenv").config(); // 환경변수 로드
const User = require("../models/user");
const tempUser = require("../models/tempuser");
const rejectedUser = require("../models/rejecteduser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.root = async (req, res) => res.redirect("/login");

exports.register = async (req, res) => {
  try {
    const { id, nickName, password } = req.body;

    const existingUser = await User.findOne({ id });
    const existingtempUser = await tempUser.findOne({ id });
    if (existingUser || existingtempUser) {
      return res
        .status(400)
        .json({ success: false, message: "이미 존재하는 ID입니다." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    // 유저 생성
    const newUser = new tempUser({
      id,
      nickName,
      password: hashedPassword,
    });
    // 유저 저장
    await newUser
      .save()
      .then((savedUser) => {
        console.log("User saved:", savedUser); // 데이터가 저장되면 출력
      })
      .catch((err) => {
        console.error("Error saving user:", err); // 에러가 발생하면 출력
      });
    res.status(201).json({
      message: "회원가입이 완료되었습니다.",
      // FE에서 쓸거면 활용
      //userId: newUser.id,
      //nickName: newUser.nickName,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "서버 오류가 발생했습니다(회원가입).",
      error,
    });
  }
};

exports.login = async (req, res) => {
  const { id, password } = req.body;
  console.log("로그인 요청 도착:", req.body);
  try {
    // 유저 확인
    const user = await tempUser.findOne({ id });
    //onst user = await User.findOne({ id });

    if (!user) {
      return res.status(400).json({ error: "등록되지 않은 사용자입니다." });
    }
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "비밀번호가 잘못되었습니다." });
    }
    const token = jwt.sign(
      { userId: user.id, userStatus: user.status },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    console.log("갓 발급한 토큰(authController_login):", token); // 로그 추가
    res.status(200).json({ token, userId: user.id });
  } catch (error) {
    res.status(500).json({ error: "서버 오류가 발생했습니다.(음)" });
  }
};

// ID 중복 체크
exports.checkIdAvailability = async (req, res) => {
  const { id } = req.body;
  const existingUser = await User.findOne({ id });
  const existingtempUser = await tempUser.findOne({ id });

  // 중복 ID가 없으면 사용 가능
  if (!existingUser || !existingtempUser) {
    return res.status(200).json({ available: true });
  }

  // 중복 ID가 있으면 사용 불가
  res.json({ available: false });
};

// 유저 정보 조회
exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "서버 오류 발생" });
  }
};

exports.checkHome = async (req, res) => {
  try {
    if (!req.user) {
      // req.user가 없다면 인증이 누락된 것으로 간주하여 에러 반환
      return res
        .status(401)
        .json({ message: "인증된 사용자 정보가 없습니다." });
    }

    const user = req.user; // 미들웨어에서 검증된 사용자 정보 사용
    res.status(200).json({ userId: user.id });
  } catch (error) {
    console.error("서버 오류:", error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
};

// 로그아웃
exports.logout = (req, res) => {
  res.status(200).json({ message: "로그아웃되었습니다." });
};

// 대기 사용자 불러오기 ( FE 작업에 따라 수정 예상 )
exports.getTempUsers = async (req, res) => {
  try {
    const tempUsers = await tempUser.find();
    res.status(200).json(tempUsers);
  } catch (error) {
    res.status(500).json({ message: "서버 오류가 발생했습니다(조회)." });
  }
};

// 대기 사용자 승인
exports.approveUser = async (req, res) => {
  try {
    const { id } = req.body;
    const tempUser = await tempUser.findOne({ id });

    if (!tempUser) {
      return res
        .status(404)
        .json({ message: "대기 중인 사용자를 찾을 수 없습니다." });
    }

    const newUser = new User({
      id: tempUser.id,
      nickName: tempUser.nickName,
      password: tempUser.password, // 이미 해시된 비밀번호
    });
    await newUser.save();

    // tempUser에서 삭제
    await tempUser.deleteOne({ id });
    res.status(200).json({ message: "사용자가 승인되었습니다." });
  } catch (error) {
    res.status(500).json({ message: "서버 오류가 발생했습니다(승인)." });
  }
};

// 대기 사용자 거절
exports.rejectUser = async (req, res) => {
  try {
    const { id } = req.body;
    const tempUser = await tempUser.findOne({ id });

    if (!tempUser) {
      return res
        .status(404)
        .json({ message: "대기 중인 사용자를 찾을 수 없습니다." });
    }

    const rejectednewUser = new rejectedUser({
      id: tempUser.id,
      nickName: tempUser.nickName,
      reason,
    });
    await rejectednewUser.save();

    // tempUser에서 삭제
    await tempUser.deleteOne({ id });
    res.status(200).json({ message: "사용자가 거절되었습니다." });
  } catch (error) {
    res.status(500).json({ message: "서버 오류가 발생했습니다(거절)." });
  }
};

// 토큰 검증
exports.verifyToken = (req, res) => {
  res.status(200).json({ success: true, user: req.user });
};
