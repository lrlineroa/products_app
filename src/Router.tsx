import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./modules/auth/screens/Login";
import SignUp from "./modules/auth/screens/SignUp";
import { useIsAdmin, useIsLoggedIn } from "./modules/auth/store/selectors";
import Dashboard from "./modules/dashboard/screens/Dashboard";
import Invoices from "./modules/invoices/screens/Invoices";
import PurchaseSummary from "./modules/invoices/screens/PurchaseSummary";
import Products from "./modules/products/screens/Products";

export default function Router() {
  const isLoggedIn = useIsLoggedIn();
  const isAdmin=useIsAdmin();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Dashboard /> : <Login />} />
        {!isLoggedIn ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
          </>
        ) :<>
            <Route path="/summary" element={<PurchaseSummary />} />
            {
              isAdmin?
                <Route path="/products" element={<Products />} />
              :null
            }
            <Route path="/invoices" element={<Invoices />} />
        </>}
      </Routes>
    </BrowserRouter>
  );
}
