import { createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";

const cookie = new Cookies();

const initialState = {
  bookId: cookie.get("id"),
};

export const paramesSlice = createSlice({
  name: "bookId",
  initialState,
  reducers: {
    bookIdGet: (state, action) => {
      state.bookId = action.payload;
    },
  },
});

export const { bookIdGet } = paramesSlice.actions;