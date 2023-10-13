import React, { useEffect, useState } from "react";
import "./header.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { url } from "../const";
import { useCookies } from "react-cookie";

export const Header = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const [cookies] = useCookies();
  const [useName,setUseName] = useState("ゲスト");

  useEffect(() => {
    axios
      .get(`${url}/users`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUseName(res.data.name);
      })
      .catch((res) => {
        console.log(res.response.data);
      });
  }, []);


  return (
    <header className="header">
      <Link to="/" className="header__nav">
        <h1 className="header__logo">Book Review Web</h1>
        <h1 className="header__logo-sp">
          Book
          <br />
          Review
          <br />
          Web
        </h1>
      </Link>

      {auth ? (<><span className="header__nav">{useName}様</span> <span>ログアウト</span></>):(<Link to="signin" className="header__nav">
        ログイン
      </Link>
      )}
    </header>
  );
};
