import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./features/AuthSlice";
import { userSlice } from "./features/UserSlice";

export const store = configureStore({
    reducer: {
      auth: authSlice.reducer,
      useraccount: userSlice.reducer,
    },
  });