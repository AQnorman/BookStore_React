import React, { useState, useEffect, useCallback } from "react";
import { Container, Spinner, Form, Button } from "react-bootstrap";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "../../api";
import { Book, Categories } from "../../components";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const getBooks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/books");
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  const handleSearch = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await axios.get(`/api/books?search=${searchTerm}`);
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderBooks = () => {
    if (loading) {
      return (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      );
    }

    if (!books.length) {
      return <div>No Book Found.</div>;
    }

    const filteredBooks =
      category === "" || category === "All"
        ? books
        : books.filter((book) => book.category.category === category);

    return filteredBooks.map((book, idx) => (
      <Book
        key={book.id}
        id={book.id}
        title={book.title}
        author={book.author}
        img={book.image_path}
      />
    ));
  };

  return (
    <Container style={{ minHeight: "100vh" }}>
      <Categories setCategory={setCategory} />

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="display-6 mb-0">Featured Books</h1>
        <Form onSubmit={handleSearch} className="d-flex gap-2">
          <Form.Control
            type="text"
            placeholder="Search books"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button type="submit" variant="warning">
            <AiOutlineSearch />
          </Button>
        </Form>
      </div>

      <div className="d-flex flex-row gap-5 flex-wrap">{renderBooks()}</div>
    </Container>
  );
};

export default Home;
