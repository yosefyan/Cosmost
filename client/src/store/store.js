import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import globalReducer from "./reducers/globalReducer";
import shopReducer from "./reducers/shopReducer";

export default configureStore({
  reducer: { authReducer, globalReducer, shopReducer },
});
