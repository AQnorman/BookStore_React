import React, { useEffect, useState, useCallback } from "react";
import { Book, Categories } from "../../components";
import { Container, Spinner } from "react-bootstrap";
import axios from "../../api";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const getBooks = useCallback(async () => {
    const res = await axios.get("/api/books");
    setBooks(res.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <Container style={{ minHeight: "100vh" }}>
      <Categories setCategory={setCategory} />

      <div className="display-6 mb-3">Featured Books</div>
      <div className="d-flex flex-row gap-5 flex-wrap">
        {loading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : category === "" || category === "All" ? (
          books.map((book, idx) => {
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
        ) : (
          books
            .filter((book) => book.category.category === category)
            .map((book, idx) => {
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
    </Container>
  );
};

export default Home;
