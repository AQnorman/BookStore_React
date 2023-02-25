import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../auth";

const Login = (props) => {
  const { show, setShow } = props;
  const navigate = useNavigate();

  const [login, setLogin] = useState(true);

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const [userRegister, setUserRegister] = useState({
    username: "",
    email: "",
    hashed_password: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async (e) => {
    console.log("HERE");
    e.preventDefault();

    try {
      await authService.login(userLogin.email, userLogin.password);
      console.log("Successfully Logged In.");
      navigate("/");
      setShow(false);
      window.location.reload(false);
    } catch (error) {
      if (error.response.status === 401)
        setErrorMessage("Wrong User Credentials. Please Try Again");
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setUserLogin({ ...userLogin, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await authService.register(
        userRegister.username,
        userRegister.email,
        userRegister.hashed_password
      );
      console.log("Successfully Registered.");
      navigate("/");
      setShow(false);
      window.location.reload(false);
    } catch (error) {
      setErrorMessage(error.response.status);
    }
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUserRegister({ ...userRegister, [name]: value });
  };

  return (
    <>
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
          setErrorMessage(null);
        }}
      >
        <Modal.Header closeButton></Modal.Header>
        {login ? (
          <>
            <Form onSubmit={handleLogin}>
              <Modal.Body>
                <Modal.Title className="display-6 w-100 text-center mb-3">
                  Login
                </Modal.Title>

                {errorMessage && <p className="text-danger">{errorMessage}</p>}

                <Form.Group className="mb-2">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleLoginChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleLoginChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label className="text-center w-100">
                    Don't Have an Account?{" "}
                    <Link onClick={() => setLogin(false)}>Sign Up</Link>
                  </Form.Label>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </Modal.Footer>
            </Form>
          </>
        ) : (
          <>
            <Form onSubmit={handleRegister}>
              <Modal.Body>
                <Modal.Title className="display-6 w-100 text-center mb-3">
                  Register
                </Modal.Title>

                {errorMessage && <p className="text-danger">{errorMessage}</p>}

                <Form.Group className="mb-2">
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={handleRegisterChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleRegisterChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="hashed_password"
                    onChange={handleRegisterChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label className="text-center w-100">
                    Already Have an Account?{" "}
                    <Link onClick={() => setLogin(true)}>Sign In</Link>
                  </Form.Label>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Register
                </Button>
              </Modal.Footer>
            </Form>
          </>
        )}
      </Modal>
    </>
  );
};

export default Login;
