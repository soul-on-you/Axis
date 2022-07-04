import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/CounterSlice";
import authReducer from "./slices/AuthSlice";
import { apiMiddleware } from "../api/ApiMiddleware";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    [apiMiddleware.reducerPath]: apiMiddleware.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiMiddleware.middleware),
  devTools: true,
});
