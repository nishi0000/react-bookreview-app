import { useDispatch, useSelector } from "react-redux";
import "./header.scss";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { signOut } from "../features/AuthSlice";
import {
  BookIcons,
  HomeIcons,
  SignInIcons,
  SignOutIcons,
  UserIcons,
} from "./Heroicons";
import { useState } from "react";

export const Header = () => {
  const [naviText, setNaviText] = useState("");
  const auth = useSelector((state) => state.auth.isSignIn);
  const name = useSelector((state) => state.name.userName);
  const [cookies, setCookie, removeCookie] = useCookies(); // eslint-disable-line no-unused-vars
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickSignOut = () => {
    removeCookie("token");
    navigate("/signin");
    setNaviText("");
    dispatch(signOut());
  };

  const onMouseEnterSignOut = (text) => {
    setNaviText(text);
  };

  return (
    <>
      <header className="header">
        <div className="header__log-container">
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
          {auth ? (
            <Link to="profile" className="header__nav">
              {name}様
            </Link>
          ) : (
            <Link to="profile" className="header__nav">
              gust様
            </Link>
          )}
        </div>

        {auth ? (
          <>
            <div className="header__nav-container">
              <Link
                to="/"
                onMouseEnter={() => {
                  onMouseEnterSignOut("ホーム");
                }}
                onMouseLeave={() => {
                  setNaviText("");
                }}
                className="header__nav"
              >
                <HomeIcons />
              </Link>
              <Link
                to="signin"
                onMouseEnter={() => {
                  onMouseEnterSignOut("ログアウト");
                }}
                onMouseLeave={() => {
                  setNaviText("");
                }}
                onClick={onClickSignOut}
                className="header__nav"
              >
                <SignOutIcons />
              </Link>
              <Link
                to="profile"
                onMouseEnter={() => {
                  onMouseEnterSignOut("プロフィール");
                }}
                onMouseLeave={() => {
                  setNaviText("");
                }}
                className="header__nav"
              >
                <UserIcons />
              </Link>
              <Link
                to="signin"
                onMouseEnter={() => {
                  onMouseEnterSignOut("レビュー新規作成");
                }}
                onMouseLeave={() => {
                  setNaviText("");
                }}
                onClick={onClickSignOut}
                className="header__nav"
              >
                <BookIcons />
              </Link>
            </div>
            <span className="header__nav-hover-signin">{naviText}</span>
          </>
        ) : (
          <>
            <div className="header__nav-container">
              <Link
                to="/"
                onMouseEnter={() => {
                  onMouseEnterSignOut("ホーム");
                }}
                onMouseLeave={() => {
                  setNaviText("");
                }}
                className="header__nav"
              >
                <HomeIcons />
              </Link>
              <Link
                to="signin"
                onMouseEnter={() => {
                  onMouseEnterSignOut("ログイン");
                }}
                onMouseLeave={() => {
                  setNaviText("");
                }}
                className="header__nav"
              >
                <SignInIcons />
              </Link>
            </div>
            <span className="header__nav-hover-signin">{naviText}</span>
          </>
        )}
      </header>
    </>
  );
};
