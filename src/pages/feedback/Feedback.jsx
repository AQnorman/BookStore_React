import { useEffect, useState } from "react";
import axios from "../../api";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { authService, authHeader } from "../../auth";
import { CustomToast } from "../../components";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.post(
        `/api/users/me`,
        {},
        {
          headers: authHeader(),
        }
      );
      setUser(res.data.user.id);
    };

    getUser();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault(); // replace with your user ID
    try {
      const response = await axios.post(`/api/feedbacks?user_id=${user}`, {
        feedback,
      });
      setMessage("Feedback Sent Successfully");
      setShowToast(true);
      setFeedback("");
    } catch (error) {
      console.log(error); // handle error as needed
    }
  };

  return (
    <Container className="mt-5" style={{ minHeight: "80vh" }}>
      <CustomToast show={showToast} setShow={setShowToast} message={message} />
      <Row>
        <Col>
          <div style={{ padding: "30px" }}>
            <div style={{ textAlign: "center" }}>
              <h4 style={{ fontWeight: "bold", fontSize: "20px" }}>
                "Leave feedback and help us improve!"
              </h4>
            </div>
            <div
              style={{
                marginTop: "20px",
                fontSize: "18px",
                textAlign: "center",
              }}
            >
              <p>
                We appreciate your input and we would love to hear your thoughts
                on how we can make our website even better for you. Please take
                a moment to leave your feedback below.
              </p>
            </div>
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2" controlId="formFeedback">
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Enter your feedback"
                value={feedback}
                onChange={(event) => setFeedback(event.target.value)}
                required
                disabled={!authService.getCurrentUser()}
              />
            </Form.Group>
            <div className="mb-2">
              {!authService.getCurrentUser() ? "You have to Login first." : ""}
            </div>
            <Button
              variant="primary"
              type="submit"
              disabled={!authService.getCurrentUser()}
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Feedback;
