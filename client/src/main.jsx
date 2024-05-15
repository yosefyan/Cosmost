import React from "react";
import ReactDOM from "react-dom/client";
import "../src/css/style.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import store from "./store/store.js";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
