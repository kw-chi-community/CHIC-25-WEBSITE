import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Banner from "../components/Banner";
import Icons from "../components/Icons";
import "../styles/Calendar.css";

// 요일 변환 함수
const getDayOfWeek = (dateString) => {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const date = new Date(dateString);
  return days[date.getDay()];
};

const Calendar = () => {
  const [events] = useState([
    { title: "2025학년도 1학기 개강 (학기개시일)", date: "2025-03-04" },
  ]);

  return (
    <>
      <Banner />
      <Icons />
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          headerToolbar={{
            left: "prev",
            center: "title",
            right: "next",
          }}
          titleFormat={{ year: "numeric", month: "2-digit" }}
          height="auto"
        />
      </div>

      {/* 하단 일정 목록 */}
      <div className="event-list">
        {events.map((event, index) => {
          const dayOfWeek = getDayOfWeek(event.date);
          return (
            <div key={index} className="event-item">
              <span className="event-date">
                {event.date} ({dayOfWeek})
              </span>
              <span className="event-separator"> ~ </span>
              <span className="event-date">
                {event.date} ({dayOfWeek})
              </span>
              <span className="event-title"> {event.title}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Calendar;
