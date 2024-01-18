import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Router from "./Router";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <Router />
      </Provider>
    </React.StrictMode>
  );
}

export default App;
