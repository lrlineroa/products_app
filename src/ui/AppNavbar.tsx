import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { useIsAdmin, useUserAuth } from "../modules/auth/store/selectors";
import { logout } from "../modules/auth/store/slices/auth.slice";
import { useAppDispatch } from "../redux/hooks";
export default function AppNavbar() {
  const userAuth = useUserAuth();
  const isAdmin = useIsAdmin();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <Link to="/">Products app</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {userAuth ? (
              <NavDropdown title={userAuth?.name} id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Cuenta</NavDropdown.Item>
                <NavDropdown.Item href="">
                  <Link to="/invoices">
                    {isAdmin ? "Histórico de compras" : "Mis compras"}
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item href="">
                  <Link to="/">{isAdmin ? "Inicio" : "Tienda"}</Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Cerrar sesión
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link href="login">Login</Nav.Link>
                <Nav.Link href="/sign-up">Registro</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
