import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAppDispatch } from "../../../redux/hooks";
import { useEditingProduct } from "../store/selectors";
import { clearEditingProduct } from "../store/slices/products.slice";
import {
  createProduct,
  deleteAProduct,
  getAllProducts,
  updateAProduct,
} from "../store/thunks";
import { Product } from "../types";

export default function ProductForm() {
  const editingItem = useEditingProduct();
  const [name, setName] = useState("");
  const [batch_number, setBatchNumber] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const dispatch = useAppDispatch();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = {
      name,
      batch_number,
      price,
      stock,
    };
    if (editingItem) {
      await dispatch(updateAProduct(data));
      dispatch(clearEditingProduct({}));
    } else {
      await dispatch(createProduct(data));
    }
    await dispatch(getAllProducts());
  };
  const handleCancelEditing = () => {
    dispatch(clearEditingProduct({}));
  };
  const handleDelete = async () => {
    await dispatch(deleteAProduct());
    await dispatch(getAllProducts());
    dispatch(clearEditingProduct({}));
  };
  const validateForm = () => {
    return name.length > 0 && batch_number.length > 0;
  };
  useEffect(() => {
    if (!editingItem) return;
    setName(editingItem?.name);
    setBatchNumber(editingItem?.batch_number);
    setPrice(editingItem?.price);
    setStock(editingItem?.stock);
  }, [editingItem]);

  return (
    <>
      <h3>{editingItem ? "Editanto" : "Nuevo"} Producto</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Nombre Producto</Form.Label>
          <Form.Control
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Número de lote</Form.Label>

          <Form.Control
            value={batch_number}
            onChange={(e) => setBatchNumber(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Precio</Form.Label>

          <Form.Control
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Stock</Form.Label>

          <Form.Control
            type="number"
            value={stock}
            onChange={(e) => setStock(parseInt(e.target.value))}
          />
        </Form.Group>

        <Button size="lg" type="submit" disabled={!validateForm()}>
          {editingItem ? "Actualizar" : "Registrar"}
        </Button>
        {editingItem ? (
          <>
            <Button size="lg" onClick={handleDelete}>
              Borrar producto
            </Button>
            <Button size="lg" onClick={handleCancelEditing}>
              Cancelar
            </Button>
          </>
        ) : null}
      </Form>
    </>
  );
}
