import { Container, Row, Col } from "react-bootstrap";

const AboutUs = () => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Container style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <h2 style={{ marginBottom: "30px" }}>About Us</h2>
            <p style={{ fontSize: "18px", lineHeight: "28px" }}>
              <strong>"Books are a uniquely portable magic."</strong> ― Stephen
              King
            </p>
            <p style={{ fontSize: "18px", lineHeight: "28px" }}>
              At our bookstore, we believe that books are indeed a magical thing
              that can take us on extraordinary journeys, and we're on a mission
              to share this magic with as many people as possible. We're
              passionate about books and reading, and we believe that everyone
              can benefit from the knowledge, inspiration, and imagination that
              books offer.
            </p>
            <p style={{ fontSize: "18px", lineHeight: "28px" }}>
              Our selection of books spans a wide range of genres and interests,
              and we're constantly updating our inventory with the latest and
              greatest titles. Our team is made up of book lovers who are always
              on the lookout for the next great read, and we're always happy to
              recommend something new to our customers.
            </p>
            <p style={{ fontSize: "18px", lineHeight: "28px" }}>
              Whether you're a lifelong bookworm or just looking to discover the
              magic of reading, we're here to help you find your next favorite
              book. Stop by our store today and experience the joy of books for
              yourself!
            </p>
            <p style={{ fontSize: "18px", lineHeight: "28px" }}>
              <strong>
                "A reader lives a thousand lives before he dies. The man who
                never reads lives only one."
              </strong>{" "}
              ― George R.R. Martin
            </p>
            <p style={{ fontSize: "18px", lineHeight: "28px" }}>
              <strong>
                "The more that you read, the more things you will know. The more
                that you learn, the more places you'll go."
              </strong>{" "}
              ― Dr. Seuss
            </p>
            <p style={{ fontSize: "18px", lineHeight: "28px" }}>
              <strong>
                "Books are a form of political action. Books are knowledge.
                Books are reflection. Books change your mind."
              </strong>{" "}
              ― Toni Morrison
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutUs;
