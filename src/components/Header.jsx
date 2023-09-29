import React from "react";
import "./header.scss";
import logo from ".././images/logo.png";
import logoSP from ".././images/logo-sp.png";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="header">
      <Link to="/">
        <img className="logo-PC" src={logo} />
      </Link>
      <Link to="/">
        <img className="logo-SP" src={logoSP} />
      </Link>
      <Link to="signin">ログイン</Link>
    </header>
  );
};
