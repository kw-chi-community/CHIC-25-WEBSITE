import React, { useState, useEffect } from "react";
import Banner from "../components/Banner";
import Icons from "../components/Icons";
import "../styles/FreeBoard.css";
import CreateArticle from "../components/CreateArticle";
import ReactGA4 from "react-ga4";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const FreeBoard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { postId } = useParams();
  const address = process.env.REACT_APP_BACKEND_ADDRESS;

  const [userId, setUserId] = useState(null);
  const [userNickname, setUserNickname] = useState(null);
  const [userStatus, setUserStatus] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(postId || null);

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
      } else {
        localStorage.removeItem("token");
      }
    } catch (error) {
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    checkAccessToken();
    ReactGA4.send({
      hitType: "pageview",
      page: location.pathname + location.search,
      title: "FreeBoard",
    });
  }, [location]);

  useEffect(() => {
    setSelectedPostId(postId || null);
  }, [postId]);

  const handleBoardClick = () => {
    setSelectedPostId(null);
    navigate("/freeboard");
  };

  return (
    <div className="free-board">
      <Banner />
      <Icons />
      <div className="board-container" onClick={handleBoardClick}>
        자유게시판
      </div>
      <CreateArticle 
        selectedPostId={selectedPostId} 
        setSelectedPostId={(id) => {
          setSelectedPostId(id);
          navigate(`/freeboard/${id}`);
        }} 
        userId={userId}
        userNickname={userNickname}
        userStatus={userStatus}
      />
    </div>
  );
};

export default FreeBoard;
