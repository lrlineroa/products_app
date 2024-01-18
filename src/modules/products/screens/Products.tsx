import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AppNavbar from "../../../ui/AppNavbar";
import { useProducts } from "../../invoices/store/selectors";
import { Table } from "react-bootstrap";
import { useAppDispatch } from "../../../redux/hooks";
import { getAllProducts } from "../store/thunks";
import ProductForm from "./ProductForm";
import { Product } from "../types";
import { setEditingProduct } from "../store/slices/products.slice";
export default function Products() {
  const products = useProducts();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  const setEditingItem = (product:Product)=>{
    dispatch(setEditingProduct(product))
  }
  return (
    <>
      <AppNavbar />
      <Container>
        <Row>
          <Col lg="3">
            <ProductForm/>
          </Col>
          <Col>
            <h3>ProductsList</h3>
            {products && products.length > 0 && (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    {Object.keys(products[0]).map((key) => (
                      <th key={Math.random()}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.map((product: any) => (
                    <tr
                      onClick={() => {setEditingItem(product)}}
                      style={{ cursor: "pointer" }}
                      key={Math.random()}
                    >
                      {Object.keys(product).map((key) => (
                        <td key={Math.random()}>{product[key]}</td>
                      ))}
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
