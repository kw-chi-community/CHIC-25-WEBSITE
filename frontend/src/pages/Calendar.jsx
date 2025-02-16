import React, { useState, useEffect } from "react";
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

  const address = process.env.REACT_APP_BACKEND_ADDRESS;
  const checkAccessToken = async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) return; // 토큰이 없으면 검증하지 않음
    else {
      try {
        const response = await fetch(`${address}/verify`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Bearer 형식으로 토큰 전송
          },
        });

        const result = await response.json();
        console.log(result);

        if (result.success) {
          console.log("ㅎㅇㅎㅇ");
          //setUserId(result.user.userId);
          //setUserNickname(result.user.userNickname);
        }
      } catch (error) {
        console.error("토큰 검증 중 오류 발생:", error);
        localStorage.removeItem("token");
        window.location.href = "/calendar";
      }
    }
  };

  useEffect(() => {
    checkAccessToken();
  }, []);

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
