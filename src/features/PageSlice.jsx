import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageIndex: 0,
  pageNumber:0,
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    pageMove:(state)=>{
        state.pageIndex += 10;
    },
    pageBack:(state)=>{
        state.pageIndex -= 10;
    },
    pageTop:(state)=>{
        state.pageIndex = 0;
    },
    pageNumberGet:(state,number)=>{
      state.pageNumber = number;
    },
  },
});

export const { pageMove, pageBack,pageTop,pageNumberGet } = pageSlice.actions;
