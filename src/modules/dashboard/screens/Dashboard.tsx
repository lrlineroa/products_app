import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import AppNavbar from "../../../ui/AppNavbar";
import { useIsAdmin } from "../../auth/store/selectors";
import ShoppingCart from "../../products/screens/ShoppingCart";
import AdminHome from "./AdminHome";

export default function Dashboard() {
  const isAdmin=useIsAdmin();
  return (
    <>
      <AppNavbar />
      <Container>
        <Row>
          {
            !isAdmin?
            <ShoppingCart/>
            :
            <AdminHome/>
          }
        </Row>
      </Container>
    </>
  );
}
