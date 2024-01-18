import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AppNavbar from "../../../ui/AppNavbar";
import { useInvoices } from "../../invoices/store/selectors";
import { Table } from "react-bootstrap";
import { useAppDispatch } from "../../../redux/hooks";
import { getAllInvoices } from "../store/thunks";
import { Invoice, ProductWithInvoiceItems } from "../types";
import { UserType } from "../../auth/types";
export default function Invoices() {
  const invoices = useInvoices();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllInvoices());
  }, []);
  const getProductsString = (products: ProductWithInvoiceItems[]): string => {
    return products
      .map((item) => {
        return item.name;
      })
      .join(",");
  };

  const getUserString = (user: UserType): string => {
    return `${user.name} - ${user.email}`;
  };
  return (
    <>
      <AppNavbar />
      <Container>
        <Row>
          <Col>
            <h3>Histórico de compras</h3>
            {invoices && invoices.length > 0 && (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>id</th>
                    <th>fecha</th>
                    <th>productos</th>
                    <th>usuario</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice: Invoice) => (
                    <tr style={{ cursor: "pointer" }} key={Math.random()}>
                      <td>{invoice.id}</td>
                      <td>{invoice.invoice_date?.toISOString()}</td>
                      <td>{getProductsString(invoice.Products)}</td>
                      <td>{getUserString(invoice.User)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
