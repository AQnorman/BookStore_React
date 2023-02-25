import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const CustomToast = (props) => {
  const { message, show, setShow } = props;

  return (
    <ToastContainer position="top-center" className="p-3">
      <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
        <Toast.Header>
          <strong className="me-auto">Message</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default CustomToast;
