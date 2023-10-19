import { createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";

const cookie = new Cookies();

const initialState = {
  isSignIn: cookie.get("token") !== undefined,
  userToken: cookie.get("token"),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.isSignIn = true;
      state.userToken = action.payload;
    },
    signOut: (state) => {
      state.isSignIn = false;
      state.userToken = "";
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
