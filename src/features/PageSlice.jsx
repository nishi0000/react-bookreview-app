import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageIndex: 0,
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
  },
});

export const { pageMove, pageBack,pageTop} = pageSlice.actions;
