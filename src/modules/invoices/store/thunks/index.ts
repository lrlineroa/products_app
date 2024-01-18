import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../../../redux/store";

const backendURL = "http://localhost:3001";

export const getAllInvoices = createAsyncThunk(
  "invoices/getAll",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const userAuthId = state.auth.user?.id;
      const userRoleId = state.auth.user?.UserRoleId;
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      let url =
        `${backendURL}` +
        (userRoleId === 1 ? "/invoices" : `/users/${userAuthId}/invoices`);
      let response = await axios.get(url, config);
      return response.data;
    } catch (error: any) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const createInvoice = createAsyncThunk(
  "invoices/create",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const taxes = 0;
      let totalShoppingCart = 0;
      const shoppingCart = state.products.shopingCart;
      for (let item of shoppingCart) {
        totalShoppingCart += item.total_price;
      }
      const UserId = state.auth.user?.id;
      const total = totalShoppingCart;
      const subtotal = totalShoppingCart;
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const data2Send = {
        UserId,
        total,
        subtotal,
        taxes,
        invoice_items: shoppingCart,
      };
      let response = await axios.post(
        `${backendURL}/invoices`,
        data2Send,
        config
      );
      return response.data;
    } catch (error: any) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
