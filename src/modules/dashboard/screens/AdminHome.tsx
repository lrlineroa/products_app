import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AppNavbar from "../../../ui/AppNavbar";
import { useUserAuth } from "../../auth/store/selectors";

export default function AdminHome() {
  const userAuth = useUserAuth();
  const navigate = useNavigate();
  const goToProducts = () => {
    navigate("products");
  };
  const goToInvoices = () => {
    navigate("invoices");
  };
  return (
    <>
      <Container>
        <Row>
          <Col>
            <h2>Hola {userAuth?.name} ¿Qué quieres hacer hoy?</h2>
            <Button size="lg" onClick={goToProducts}>
              Administrar Productos
            </Button>
            <Button size="lg" onClick={goToInvoices}>
              Ver historico de compras
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
