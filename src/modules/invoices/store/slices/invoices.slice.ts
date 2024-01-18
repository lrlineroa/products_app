import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BaseStateType } from "../../../../types/indes";
import { MODULE_NAME } from "../../constants";
import { InvoicesType } from "../../types";
import { getAllInvoices,createInvoice } from "../thunks";

type InvoicesState = InvoicesType & BaseStateType;

const initialState: InvoicesState = {
  loading: false,
  error: null,
  success: false,
  invoices: [],
  currentInvoice: {},
};

export const invoicesSlice = createSlice({
  name: MODULE_NAME,
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllInvoices.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllInvoices.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.error = payload;
    });
    //get books
    builder.addCase(getAllInvoices.fulfilled, (state, action: any) => {
      state.loading = false;
      state.error = null;
      state.invoices=action.payload
    });
  },
});
export const { } = invoicesSlice.actions;
export default invoicesSlice.reducer;
