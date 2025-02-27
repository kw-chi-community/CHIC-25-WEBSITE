import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Notice from "./pages/Notice";
import Calendar from "./pages/Calendar";
import FreeBoard from "./pages/FreeBoard";
import About from "./pages/About";
import Organization from "./pages/Organization";
import Activity from "./pages/Activity";
import History from "./pages/History";
import Member from "./pages/Member";
import Application from "./pages/Application";
import Recruit from "./pages/Recruit";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/freeboard" element={<FreeBoard />} />
        <Route path="/about" element={<About />} />
        <Route path="/organization" element={<Organization />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/history" element={<History />} />
        <Route path="/member" element={<Member />} />
        <Route path="/application" element={<Application />} />
        <Route
          path={process.env.REACT_APP_RECRUIT_PATH}
          element={<Recruit />}
        />
      </Routes>
    </Router>
  );
};

export default App;
