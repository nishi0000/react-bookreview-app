import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../const";
import { useCookies } from "react-cookie";

const initialState = {};
const [cookies] = useCookies();

export const userSlice = createSlice({
  name: "useraccount",
  initialState,
  reducers: {
    userAccountGet: (state) =>{
      axios
        .get(`${url}/users`,
        {
          headers: {
            authorization: `Bearer ${cookies.token}`,
          },
        }
        )
        .then((res) => {
          console.log(res.data);
          state = res.data;
        })
        .catch((res) => {
          console.log(res.response.data);
        });
    }
  },
});

export const { userAccountGet } = userSlice.actions;
