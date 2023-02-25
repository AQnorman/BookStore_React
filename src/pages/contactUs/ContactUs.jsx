import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: send contact form data to backend
  };

  return (
    <div
      style={{ marginTop: "5rem", marginBottom: "5rem", minHeight: "100vh" }}
    >
      <Container>
        <h2 style={{ fontWeight: "bold", marginBottom: "2rem" }}>Contact Us</h2>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
              Name:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
              Email:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
              Message:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                as="textarea"
                rows={5}
                placeholder='Enter your message, e.g. "I have a question about the book."'
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                required
              />
            </Col>
          </Row>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default ContactUs;
