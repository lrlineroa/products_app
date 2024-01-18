import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BaseStateType } from "../../../../types/indes";
import { createInvoice } from "../../../invoices/store/thunks";
import { MODULE_NAME } from "../../constants";
import { ProductsType } from "../../types";
import { getAllProducts } from "../thunks";

type ProductsState = ProductsType & BaseStateType;

const initialState: ProductsState = {
  loading: false,
  error: null,
  success: false,
  products: [],
  shopingCart: [],
  editingProduct:null,
};

export const productSlice = createSlice({
  name: MODULE_NAME,
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addToShoppingCart: (state, action) => {
      state.shopingCart.push(action.payload);
    },
    emptyShopingCart: (state) => {
      state.loading = false;
      state.shopingCart = [];
      state.error = null;
      state.success = false;
    },
    setEditingProduct:(state,action)=>{
      state.editingProduct=action.payload
    },
    clearEditingProduct:(state,_)=>{
      state.editingProduct=null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllProducts.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.error = payload;
    });
    //get books
    builder.addCase(getAllProducts.fulfilled, (state, action: any) => {
      state.loading = false;
      state.error = null;
      state.products = action.payload;
    });
    builder.addCase(createInvoice.fulfilled, (state, action: any) => {
      state.loading = false;
      state.shopingCart = [];
      state.error = null;
      state.success = false;
    });
  },
});
export const { emptyShopingCart, addToShoppingCart, setEditingProduct,clearEditingProduct } = productSlice.actions;
export default productSlice.reducer;
