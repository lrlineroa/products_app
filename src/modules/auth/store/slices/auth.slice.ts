import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BaseStateType } from "../../../../types/indes";
import { MODULE_NAME } from "../../constants";
import { AuthType } from "../../types";
import { loginUser, registerUser } from "../thunks";

type AuthState = AuthType & BaseStateType;

const initialState: AuthState = {
  loading: false,
  user: null,
  JWTToken: null,
  error: null,
  success: false,
};

export const authSlice = createSlice({
  name: MODULE_NAME,
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    logout: (state) => {
      state.loading = false;
      state.user = null;
      state.JWTToken = null;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.error = payload;
    });
    //get books
    builder.addCase(registerUser.fulfilled, (state, action: any) => {
      state.loading = false;
      state.error = null;
      state.JWTToken = action.payload?.accessToken;
      state.user = {
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        UserRoleId: action.payload.UserRoleId,
      };
    });
    builder.addCase(loginUser.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.error = payload;
    });
    //get books
    builder.addCase(loginUser.fulfilled, (state, action: any) => {
      state.loading = false;
      state.error = null;
      state.JWTToken = action.payload?.accessToken;
      state.user = {
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        UserRoleId: action.payload.UserRoleId,
      };
    });
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
