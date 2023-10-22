import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./features/AuthSlice";
import { pageSlice } from "./features/PageSlice";
import { userSlice } from "./features/UserSlice";
import { paramesSlice } from "./features/PramesSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    page: pageSlice.reducer,
    name: userSlice.reducer,
    bookId: paramesSlice.reducer,
  },
});
