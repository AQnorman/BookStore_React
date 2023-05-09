import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, Button, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../auth";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Login from "../login/Login";

const NavigationBar = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const user = authService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <>
      <Login show={show} setShow={setShow} />
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="dark"
        style={{ backgroundColor: "#47026c" }}
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
            BookStore
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/contact-us">
                Contact Us
              </Nav.Link>
              <Nav.Link as={Link} to="/about-us">
                About Us
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link>
                {currentUser ? (
                  <>
                    <Stack direction="horizontal" gap={1}>
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => {
                          authService.logout();
                          navigate("/");
                          window.location.reload(false);
                        }}
                      >
                        Logout
                      </Button>
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => navigate("/profile")}
                      >
                        <FaUserCircle size={30} color="#ffc107" />
                      </Button>
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => navigate("/cart")}
                      >
                        <AiOutlineShoppingCart size={30} color="#ffc107" />
                      </Button>
                    </Stack>
                  </>
                ) : (
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => setShow(true)}
                  >
                    Login
                  </Button>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
