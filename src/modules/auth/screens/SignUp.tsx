import React, { useState } from "react";

import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";
import { Container, Spinner } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AppNavbar from "../../../ui/AppNavbar";
import { useAppDispatch } from "../../../redux/hooks";
import { registerUser } from "../store/thunks";
import { useNavigate } from "react-router-dom";
import { useLoginIsLoading } from "../store/selectors";

// import "./Login.css";

export default function Login() {
  const isLoading = useLoginIsLoading();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0 && name.length > 0;
  }

  async function handleSubmit(event: any) {
    event.preventDefault();
    await dispatch(registerUser({ name, email, password }));
    navigate("/");
  }

  return (
    <>
      <AppNavbar />
      <Container>
        <Row>
          <Col>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Nombre</Form.Label>

                <Form.Control
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>

                <Form.Control
                  autoFocus
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>

                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button
                size="lg"
                type="submit"
                disabled={!validateForm() || isLoading}
              >
                {!isLoading ? "Registro" : <Spinner animation="border" />}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
