import {combineReducers} from 'redux';
import * as auth from '../../modules/auth/constants';
import * as products from '../../modules/products/constants';
import * as invoices from '../../modules/invoices/constants';
import type {PayloadAction} from '@reduxjs/toolkit';
import authSlice from '../../modules/auth/store/slices/auth.slice';
import productsSlice from '../../modules/products/store/slices/products.slice';
import invoicesSlice from '../../modules/invoices/store/slices/invoices.slice';
const LOG_OUT = 'LOG_OUT';

// combine reducers to build the state
const appReducer = combineReducers({
  [auth.MODULE_NAME]: authSlice,
  [products.MODULE_NAME]:productsSlice,
  [invoices.MODULE_NAME]:invoicesSlice
});

const rootReducer = (state: any, action: PayloadAction) => {
  if (action.type === LOG_OUT) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
