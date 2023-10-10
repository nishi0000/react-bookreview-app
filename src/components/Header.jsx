import React from "react";
import "./header.scss";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="signin-link">
        <h1 className="header-logo">Book Review Web</h1>
        <h1 className="header-logo-sp">
          Book
          <br />
          Review
          <br />
          Web
        </h1>
      </Link>
      <Link to="signin" className="signin-link">
        ログイン
      </Link>
    </header>
  );
};
