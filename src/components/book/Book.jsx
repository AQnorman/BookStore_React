import React from "react";
import { useNavigate } from "react-router-dom";
import "./Book.css";

const Book = (props) => {
  const { id, title, author, img } = props;
  const navigate = useNavigate();

  return (
    <div className="book" onClick={() => navigate(`/${id}`)}>
      <img
        src={`http://localhost:8000/uploads/${img}`}
        className="book-img"
      ></img>
      <div className="book-title">{title}</div>
      <div className="book-author">{author}</div>
    </div>
  );
};

export default Book;
