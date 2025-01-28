import React from "react";
import { FaGithub, FaInstagram } from "react-icons/fa"; 
import "../styles/Icons.css";

const Icons = () => {
  return (
    <div className="icons-container">
      <a href="https://github.com/kw-chi-community" target="_blank" rel="noopener noreferrer">
        <FaGithub className="icon github" />
      </a>
      <a href="https://www.instagram.com/chic_stg/" target="_blank" rel="noopener noreferrer">
        <FaInstagram className="icon instagram" />
      </a>
    </div>
  );
};

export default Icons;
