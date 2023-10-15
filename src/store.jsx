import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./features/AuthSlice";
import { pageSlice } from "./features/PageSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    page: pageSlice.reducer,
  },
});
