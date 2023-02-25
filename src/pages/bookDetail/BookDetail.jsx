import React, { useCallback, useState, useEffect } from "react";
import "./BookDetail.css";
import { Container, Button, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../api";
import { Book, CustomToast } from "../../components";
import { authHeader, authService } from "../../auth";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [userDetail, setUserDetail] = useState({});
  const [message, setMessage] = useState("");
  const [book, setBook] = useState({});
  const [books, setBooks] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(true);

  const getBookDetail = useCallback(async () => {
    const res = await axios.get(`/api/books/${id}`);
    setBook(res.data);
    const res2 = await axios.get("/api/books");
    setBooks(res2.data);
    setLoading(false);
  }, [id]);

  const getUser = async () => {
    const res = await axios.post(
      `/api/users/me`,
      {},
      {
        headers: authHeader(),
      }
    );
    setUserDetail(res.data);
  };

  useEffect(() => {
    getBookDetail();
    const user = authService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      getUser();
    }
  }, [id]);

  const addToCart = async () => {
    if (!currentUser) {
      setMessage("You need to Login First.");
      setShowToast(true);
    } else {
      await axios.post(`/api/carts/${book.id}?user_id=${userDetail.user.id}`);
      setMessage("Book Added To Card Successfully.");
      setShowToast(true);
    }
  };

  return (
    <>
      <CustomToast show={showToast} setShow={setShowToast} message={message} />
      <Container className="my-3" style={{ minHeight: "80vh" }}>
        {loading ? (
          <Row className="justify-content-center">
            <Col md={4} className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </Col>
          </Row>
        ) : (
          <>
            <Row>
              <Col sm={2}>
                <img
                  src={`http://localhost:8000/uploads/${book.image_path}`}
                  className="book-img"
                ></img>
              </Col>
              <Col sm={10}>
                <div className="book-info">
                  <div className="book-title">{book.title}</div>
                  <div className="book-author">{book.author}</div>
                  <div className="book-desc">{book.desc}</div>
                  <div className="book-total-pages">
                    {book.total_pages} pages
                  </div>
                  <div className="book-price">${book.price}</div>
                </div>
                {currentUser &&
                userDetail.user.books.filter((b) => b.id === book.id).length >
                  0 ? (
                  <Button variant="primary" size="sm">
                    Download Book
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => addToCart()}
                  >
                    Add To Cart
                  </Button>
                )}
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <div className="display-6 mb-3">Related Books</div>
                <div className="d-flex flex-row gap-5 flex-wrap">
                  {books
                    .filter(
                      (b) =>
                        b.category.category === book.category.category &&
                        b.id !== book.id
                    )
                    .map((book, idx) => {
                      return (
                        <Book
                          key={book.id}
                          title={book.title}
                          author={book.author}
                          id={book.id}
                          img={book.image_path}
                        />
                      );
                    })}
                </div>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default BookDetail;
