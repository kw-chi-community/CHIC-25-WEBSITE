const CalendarEvent = require("../models/calendarEvent");
const { v4: uuidv4 } = require("uuid");

// 모든 일정 조회
exports.getEvents = async (req, res) => {
  try {
    const events = await CalendarEvent.find().sort({ date: 1 });
    res.status(200).json(events);
  } catch (error) {
    console.error("❌ 일정 조회 오류:", error);
    res.status(500).json({ message: "일정 조회 실패" });
  }
};

// 일정 추가
exports.createEvent = async (req, res) => {
  try {
    console.log("📌 일정 생성 요청 데이터:", req.body);

    const { userId, userNickname, title, date } = req.body;

    if (!title || !date) {
      console.error("❌ 제목 또는 날짜가 누락됨");
      return res.status(400).json({ message: "제목과 날짜가 필요합니다." });
    }

    const newEvent = new CalendarEvent({
      eventId: uuidv4(),
      userId,
      userNickname,
      title,
      date,
    });

    await newEvent.save();
    console.log("📌 일정 저장 완료:", newEvent);
    res.status(201).json(newEvent);
  } catch (error) {
    console.error("❌ 일정 저장 오류:", error);
    res.status(500).json({ message: "일정 생성 실패", error: error.message });
  }
};

// 일정 수정
exports.updateEvent = async (req, res) => {
  try {
    const { title, date } = req.body;
    const event = await CalendarEvent.findOne({ eventId: req.params.eventId });

    if (!event) {
      return res.status(404).json({ message: "일정을 찾을 수 없습니다." });
    }

    event.title = title || event.title;
    event.date = date || event.date;
    event.updatedAt = new Date();

    await event.save();
    res.status(200).json(event);
  } catch (error) {
    console.error("❌ 일정 수정 오류:", error);
    res.status(500).json({ message: "일정 수정 실패" });
  }
};

// 일정 삭제
exports.deleteEvent = async (req, res) => {
  try {
    const event = await CalendarEvent.findOneAndDelete({ eventId: req.params.eventId });
    if (!event) {
      return res.status(404).json({ message: "일정을 찾을 수 없습니다." });
    }

    res.status(200).json({ message: "일정이 삭제되었습니다." });
  } catch (error) {
    console.error("❌ 일정 삭제 오류:", error);
    res.status(500).json({ message: "일정 삭제 실패" });
  }
};
