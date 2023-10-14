import { createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";

const cookie = new Cookies();

const initialState = {
  userName: cookie.get("name") !== "ゲスト",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userNameGet: (state,name) => {
        state.userName = name;
      },
  },
});

export const { signIn, signOut } = userSlice.actions;
