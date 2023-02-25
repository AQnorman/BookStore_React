import React, { useCallback, useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Stack,
  Spinner,
} from "react-bootstrap";
import { FaRegWindowClose, FaUserCircle } from "react-icons/fa";
import { Book, CartItem, CustomToast } from "../../components";
import axios from "../../api";
import { authHeader, authService } from "../../auth";

const Profile = () => {
  const [userDetail, setUserDetail] = useState({});
  const [updateUser, setUpdateUser] = useState(false);
  const [updatePassword, setUpdatePassword] = useState(false);
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState({
    username: "",
    email: "",
    hashed_password: "",
  });

  const handleUpdate = async (e) => {
    e.preventDefault();

    console.log(user);

    await axios.put(`/api/users/${userDetail.user.id}`, user);
    setLoading(false);
    setUpdatePassword("");
    setMessage("User Updated Successfully");
    setShowToast(true);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
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
    setUser({
      username: res.data.user.username,
      email: res.data.user.email,
      hashed_password: "",
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    getUserDetail();
  }, [message]);

  const checkoutBooks = async () => {
    setLoading(true);
    await axios.post(`/api/carts/checkout/${userDetail.user.id}`);
    setLoading(false);
    setMessage("Checkout Complete.");
    setShowToast(true);
  };

  return (
    <div style={{ minHeight: "80vh" }}>
      <CustomToast show={showToast} setShow={setShowToast} message={message} />
      <Container className="my-3">
        <div className="display-6 mb-3 text-center">Profile</div>

        {loading ? (
          <>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </>
        ) : (
          <>
            <Row className="justify-content-center">
              <Col sm={2}>
                <FaUserCircle size={150} />
              </Col>
              <Col sm={4}>
                <Form onSubmit={handleUpdate}>
                  <Form.Group className="mb-2">
                    <Form.Control
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={!updateUser ? userDetail.user.username : null}
                      disabled={!updateUser}
                      onChange={handleUpdateChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={!updateUser ? userDetail.user.email : null}
                      disabled={!updateUser}
                      onChange={handleUpdateChange}
                    />
                  </Form.Group>

                  {!updateUser ? (
                    <>
                      <Button
                        className="justify-self-start"
                        onClick={() => setUpdateUser(true)}
                      >
                        Update Profile
                      </Button>
                    </>
                  ) : (
                    <>
                      <Form.Group className="mb-2">
                        <Form.Control
                          type="password"
                          name="hashed_password"
                          placeholder="Password"
                          disabled={!updatePassword}
                          value={!updatePassword ? "" : null}
                          onChange={handleUpdateChange}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Stack direction="horizontal" gap={2}>
                          <Button
                            variant="outline-primary"
                            onClick={() => setUpdatePassword(true)}
                            disabled={updatePassword}
                          >
                            Change Password
                          </Button>
                          <Button type="submit">Submit</Button>
                          <Button
                            variant="link"
                            className="ms-auto"
                            onClick={() => {
                              setUpdateUser(false);
                              setUpdatePassword(false);
                            }}
                          >
                            Cancel
                          </Button>
                        </Stack>
                      </Form.Group>
                    </>
                  )}
                </Form>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
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
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="display-6 my-3">My Books</div>
                <div className="d-flex flex-row gap-5 flex-wrap">
                  {userDetail.user.books.length === 0 ? (
                    <div className="p-4 border rounded">You have No Books.</div>
                  ) : (
                    userDetail.user.books.map((book, idx) => {
                      return (
                        <Book
                          key={book.id}
                          id={book.id}
                          title={book.title}
                          author={book.author}
                          img={book.image_path}
                        />
                      );
                    })
                  )}
                </div>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
};

export default Profile;
