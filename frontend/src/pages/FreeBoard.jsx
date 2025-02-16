import React from "react";
import Banner from "../components/Banner";
import Icons from "../components/Icons";
import "../styles/FreeBoard.css";
import CreateArticle from "../components/CreateArticle";

const FreeBoard = () => {
  return (
    <div className="free-board">
      <Banner />
      <Icons />
      <div className="board-container">자유게시판</div>
      <CreateArticle />
    </div>
  );
};

export default FreeBoard;
