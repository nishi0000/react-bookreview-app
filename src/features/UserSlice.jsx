import { createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";

const cookie = new Cookies();

const initialState = {
  userName: cookie.get("name"),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userNameGet: (state, action) => {
      state.userName = action.payload;
    },
  },
});

export const { userNameGet } = userSlice.actions;
