import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login"; 
import Register from "./pages/Register";
import Notice from "./pages/Notice";
import Calendar from "./pages/Calendar";
import FreeBoard from "./pages/FreeBoard";

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
      </Routes>
    </Router>
  );
};

export default App;
