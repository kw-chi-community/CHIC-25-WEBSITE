import React, { useState, useEffect } from "react";
import { FaPlus, FaTimes, FaEdit } from "react-icons/fa";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Banner from "../components/Banner";
import Icons from "../components/Icons";
import "../styles/Calendar.css";

const Calendar = () => {
  const address = process.env.REACT_APP_BACKEND_ADDRESS;

  const [userId, setUserId] = useState(null);
  const [userNickname, setUserNickname] = useState(null);
  const [userStatus, setUserStatus] = useState(null);
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEventId, setCurrentEventId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");

  useEffect(() => {
    const checkAccessToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch(`${address}/verify`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = await response.json();
        if (result.success) {
          setUserId(result.user.userId);
          setUserNickname(result.user.userNickname);
          setUserStatus(result.user.userStatus);
        }
      } catch (error) {
        localStorage.removeItem("token");
      }
    };

    const fetchEvents = async () => {
      try {
        const response = await fetch(`${address}/calendar`);
        if (!response.ok) throw new Error("이벤트 불러오기 실패");
        const data = await response.json();

        if (!Array.isArray(data)) {
          console.error("오류: API 응답이 배열이 아닙니다.", data);
          setEvents([]);
          return;
        }
        setEvents(data);
      } catch (error) {
        console.error(error.message);
        setEvents([]);
      }
    };

    checkAccessToken();
    fetchEvents();
  }, [address]);

  const handleDeleteEvent = async (eventId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${address}/calendar/${eventId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("이벤트 삭제 실패");
      setEvents((prev) => prev.filter((event) => event.eventId !== eventId));
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCreateEvent = async () => {
    if (!newTitle || !newDate) return alert("제목과 날짜를 입력하세요.");
    const token = localStorage.getItem("token");
    try {
      const method = isEditing ? "PUT" : "POST";
      const url = isEditing ? `${address}/calendar/${currentEventId}` : `${address}/calendar`;

      const eventData = { userId, userNickname, title: newTitle, date: newDate };
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(eventData),
      });
      if (!response.ok) throw new Error("이벤트 저장 실패");
      setShowModal(false);
      setNewTitle("");
      setNewDate("");
      setIsEditing(false);
      setCurrentEventId(null);
      const updatedEvents = await response.json();
      setEvents(Array.isArray(updatedEvents) ? updatedEvents : []);
      window.location.reload();
    } catch (error) {
      alert("이벤트 등록에 실패했습니다.");
    }
  };

  return (
    <>
      <Banner />
      <Icons />
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={Array.isArray(events) ? events.map((event) => ({ title: event.title, date: event.date })) : []}
          headerToolbar={{ left: "prev", center: "title", right: "next" }}
          titleFormat={{ year: "numeric", month: "2-digit" }}
          height="auto"
        />

        <ul className="event-list">
          {Array.isArray(events) && events.map((event) => (
            <li key={event.eventId} className="event-item">
              <div className="event-info">
                <h3 className="event-title">{event.title}</h3>
                {(userStatus === "superadmin" || userStatus === "executive") && (
                  <FaEdit className="event-edit-icon" onClick={() => {
                    setNewTitle(event.title);
                    setNewDate(event.date);
                    setCurrentEventId(event.eventId);
                    setIsEditing(true);
                    setShowModal(true);
                  }} />
                )}
              </div>
              <p className="event-date">날짜: {event.date}</p>
              {(userStatus === "superadmin" || userStatus === "executive") && (
                <button className="event-delete-btn" onClick={() => handleDeleteEvent(event.eventId)}>
                  <FaTimes />
                </button>
              )}
            </li>
          ))}
        </ul>

        {(userStatus === "executive" || userStatus === "superadmin") && (
          <button className="add-event-button" onClick={() => setShowModal(true)}>
            <FaPlus />
          </button>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{isEditing ? "이벤트 수정" : "이벤트 추가"}</h3>
            <input type="text" placeholder="이벤트 제목" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
            <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
            <div className="modal-buttons">
              <button onClick={handleCreateEvent}>{isEditing ? "수정" : "등록"}</button>
              <button onClick={() => setShowModal(false)}>취소</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Calendar;
