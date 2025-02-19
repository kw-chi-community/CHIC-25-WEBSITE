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
import Location from "./pages/Location";
import History from "./pages/History";
import Member from "./pages/Member"; 
import Application from "./pages/Application";

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
        <Route path="/location" element={<Location />} />
        <Route path="/history" element={<History />} />
        <Route path="/member" element={<Member />} />
        <Route path="/application" element={<Application />} />
      </Routes>
    </Router>
  );
};

export default App;
