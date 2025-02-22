const express = require("express");
const router = express.Router();
const calendarController = require("../controllers/calendarController");

router.get("/", calendarController.getEvents); // 모든 일정 조회
router.post("/", calendarController.createEvent); // 일정 추가
router.put("/:eventId", calendarController.updateEvent); // 일정 수정
router.delete("/:eventId", calendarController.deleteEvent); // 일정 삭제

module.exports = router;
