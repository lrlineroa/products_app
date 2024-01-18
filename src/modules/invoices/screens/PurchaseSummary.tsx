import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import AppNavbar from "../../../ui/AppNavbar";
import {
  useIsShoppinCartEmpty,
  useProducts,
  useShoppinCart,
} from "../../products/store/selectors";
import { emptyShopingCart } from "../../products/store/slices/products.slice";
import { createInvoice } from "../store/thunks";

export default function PurchaseSummary() {
  const navigate = useNavigate();
  const shoppingCart = useShoppinCart();
  const products = useProducts();
  const isShoppingCartEmpty = useIsShoppinCartEmpty();
  const dispatch = useAppDispatch();
  const handlEmptyShoppingCart = () => {
    dispatch(emptyShopingCart());
    navigate("/");
  };
  const handlePurchase = async () => {
    await dispatch(createInvoice());
    navigate("/");
  };
  const getTotal = () => {
    let sum = 0;
    shoppingCart.forEach((item) => {
      sum += item.total_price;
    });
    return sum;
  };
  return (
    <>
      <AppNavbar />
      <Container>
        <Row>
          <Col>
            <h2>Resumen de la compra</h2>
            {shoppingCart.map((item) => {
              const currentProduct = products.find(
                (p) => p.id === item.ProductId
              );
              return (
                <React.Fragment key={Math.random()}>
                  <Card>
                    <Card.Title>
                      {currentProduct?.name} - Total: ${item.total_price}
                    </Card.Title>
                    <Card.Body>
                      Cantidad: {item.quantity} - Precio Unitario:{" "}
                      {item.unit_price}
                    </Card.Body>
                  </Card>
                </React.Fragment>
              );
            })}
            <h3>Total compra: ${getTotal()}</h3>
            <Button
              size="lg"
              onClick={handlePurchase}
              disabled={isShoppingCartEmpty}
            >
              Comprar
            </Button>
            <Button
              size="lg"
              onClick={handlEmptyShoppingCart}
              disabled={isShoppingCartEmpty}
            >
              Vaciar Carrito
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
