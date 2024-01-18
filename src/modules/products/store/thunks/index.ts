import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../../../redux/store";

const backendURL = "http://localhost:3001";

export const getAllProducts = createAsyncThunk(
  "products/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      let response = await axios.get(`${backendURL}/products`, config);
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

export const createProduct = createAsyncThunk(
  "products/create",
  async (data: any, { getState, rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      let response = await axios.post(`${backendURL}/products`, data, config);
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

export const updateAProduct = createAsyncThunk(
  "products/update",
  async (data: any, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const editingProductId = state.products.editingProduct?.id;
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      let response = await axios.put(
        `${backendURL}/products/${editingProductId}`,
        data,
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

export const deleteAProduct = createAsyncThunk(
  "products/delete",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const editingProductId = state.products.editingProduct?.id;
      let response = await axios.delete(
        `${backendURL}/products/${editingProductId}`
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
