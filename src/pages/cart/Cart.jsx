import React, { useCallback, useEffect, useState } from "react";
import { Container, Button, Spinner } from "react-bootstrap";
import { CartItem, CustomToast } from "../../components";
import axios from "../../api";
import { authHeader } from "../../auth";

const Cart = () => {
  const [userDetail, setUserDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const checkoutBooks = async () => {
    setLoading(true);
    await axios.post(`/api/carts/checkout/${userDetail.user.id}`);
    setLoading(false);
    setMessage("Checkout Complete.");
    setShowToast(true);
  };

  const getUserDetail = useCallback(async () => {
    const res = await axios.post(
      `/api/users/me`,
      {},
      {
        headers: authHeader(),
      }
    );
    setUserDetail(res.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    getUserDetail();
  }, []);

  return (
    <div style={{ minHeight: "90vh" }}>
      <CustomToast show={showToast} setShow={setShowToast} message={message} />
      <Container className="my-3">
        {/* <div className="display-6 mb-3 text-center">Cart</div> */}

        {loading ? (
          <>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </>
        ) : (
          <>
            <div className="d-flex flex-row mb-3">
              <div className="display-6 mb-2">My Cart</div>
              <Button
                variant="primary"
                size="sm"
                className="ms-auto h-50 align-self-end"
                onClick={() => checkoutBooks()}
                disabled={userDetail.cart.books.length === 0}
              >
                Checkout Books
              </Button>
            </div>
            {userDetail.cart.books.length === 0 ? (
              <div className="p-4 border rounded">No Items in Cart</div>
            ) : (
              <div className="d-flex flex-column gap-2">
                {userDetail.cart.books.map((book, idx) => {
                  return (
                    <CartItem
                      key={book.id}
                      id={book.id}
                      title={book.title}
                      author={book.author}
                      price={book.price}
                      user_id={userDetail.user.id}
                      img={book.image_path}
                    />
                  );
                })}
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default Cart;
