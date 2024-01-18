import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import AppNavbar from "../../../ui/AppNavbar";
import { useIsShoppinCartEmpty, useProducts } from "../store/selectors";
import { addToShoppingCart } from "../store/slices/products.slice";
import { getAllProducts } from "../store/thunks";

export default function ShoppingCart() {
  const navigate = useNavigate();
  const products = useProducts();
  const [ProductId, setProductId] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const currentProduct = products.find((p) => p.id === ProductId);
  const isShoppingCartEmpty= useIsShoppinCartEmpty();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    dispatch(
      addToShoppingCart({
        ProductId,
        quantity,
        unit_price: currentProduct?.price,
        total_price: currentProduct?.price
          ? currentProduct?.price * quantity
          : 0,
      })
    );
    alert("hecho");
    setProductId(0);
    setQuantity(0);
  };
  function validateForm() {
    return ProductId != 0 && quantity > 0;
  }
  const goToSummary = () => {
    navigate("summary");
  };
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="product_id">
                <Form.Label>Producto</Form.Label>

                <Form.Select
                  onChange={(e) => setProductId(parseInt(e.target.value))}
                >
                  <option value={0} selected={ProductId === 0}>
                    Escoge una opción
                  </option>
                  {products.map((product, index) => (
                    <option
                      key={"product_" + index}
                      value={product.id}
                      selected={ProductId === product.id}
                    >
                      {product.name} - ${product.price}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="quantity">
                <Form.Label>Cantidad</Form.Label>

                <Form.Control
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
              </Form.Group>

              <Button size="lg" type="submit" disabled={!validateForm()}>
                Agregar al carrito
              </Button>
              <Button
                size="lg"
                onClick={goToSummary}
                disabled={isShoppingCartEmpty}
              >
                Ir a pagar
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
