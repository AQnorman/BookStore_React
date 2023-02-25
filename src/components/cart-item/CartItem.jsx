import React, { useState } from "react";
import "./CartItem.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import axios from "../../api";

const CartItem = (props) => {
  const { id, title, author, price, user_id, img } = props;

  const handleDeleteClick = () => {
    axios
      .delete(`/api/carts/${user_id}/${id}`)
      .then((response) => {
        console.log(response.data.message);
        window.location.reload(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="d-flex flex-row gap-3 border bg-white shadow-sm rounded p-2">
        <img
          src={`http://localhost:8000/uploads/${img}`}
          className="cart-item-img"
        ></img>
        <div className="d-flex flex-column">
          <div className="cart-item-title">{title}</div>
          <div className="cart-item-author">{author}</div>
          <div className="cart-item-price">${price}</div>
        </div>
        <div className="ms-auto">
          <Button variant="link" onClick={handleDeleteClick}>
            <MdDelete size={20} />
          </Button>
        </div>
      </div>
    </>
  );
};

export default CartItem;
