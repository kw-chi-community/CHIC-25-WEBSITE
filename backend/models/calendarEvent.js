const mongoose = require("mongoose");

const calendarEventSchema = new mongoose.Schema({
  eventId: { type: String, required: true, unique: true }, // 일정 고유 ID
  userId: { type: String, required: true }, // 작성자 ID
  userNickname: { type: String, required: true }, // 작성자 닉네임
  title: { type: String, required: true }, // 일정 제목
  date: { type: String, required: true }, // 일정 날짜
  createdAt: { type: Date, default: Date.now }, // 생성 날짜
  updatedAt: { type: Date, default: null }, // 수정 날짜
});

const CalendarEvent = mongoose.model("CalendarEvent", calendarEventSchema);
module.exports = CalendarEvent;
