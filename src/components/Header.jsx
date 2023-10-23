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
  const [modalOpen, setModalOpen] = useState(false);
  const auth = useSelector((state) => state.auth.isSignIn);
  const name = useSelector((state) => state.name.userName);
  const [cookies, setCookie, removeCookie] = useCookies(); // eslint-disable-line no-unused-vars
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickSignOut = () => {
    removeCookie("token");
    dispatch(signOut());
    Navigate("/signin");
    setNaviText("");
    setModalOpen(false);
  };

  const onMouseNaviText = (text) => {
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
            <Link to="signin" className="header__nav">
              guest様
            </Link>
          )}
        </div>

        {auth ? (
          <>
            <div className="header__nav-container">
              <Link
                to="/"
                onMouseEnter={() => {
                  onMouseNaviText("ホーム");
                }}
                onMouseLeave={() => {
                  setNaviText("");
                }}
                className="header__nav"
              >
                <HomeIcons />
              </Link>
              <div
                onClick={() => setModalOpen(true)}
                onMouseEnter={() => {
                  onMouseNaviText("ログアウト");
                }}
                onMouseLeave={() => {
                  setNaviText("");
                }}
                className="header__nav"
              >
                <SignOutIcons />
              </div>
              {modalOpen && (
                <div className="header__modal-overlay">
                  <div className="header__modal-content">
                    <p>ログアウトしますか？</p>
                      <button
                        className="header__modal-button"
                        onClick={() => {
                          onClickSignOut();
                        }}
                      >
                        はい
                      </button>
                      <button
                        className="header__modal-button"
                        onClick={() => setModalOpen(false)}
                      >
                        いいえ
                      </button>
                  </div>
                </div>
              )}
              <Link
                to="profile"
                onMouseEnter={() => {
                  onMouseNaviText("プロフィール");
                }}
                onMouseLeave={() => {
                  setNaviText("");
                }}
                className="header__nav"
              >
                <UserIcons />
              </Link>
              <Link
                to="new"
                onMouseEnter={() => {
                  onMouseNaviText("レビュー新規作成");
                }}
                onMouseLeave={() => {
                  setNaviText("");
                }}
                className="header__nav"
              >
                <BookIcons />
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="header__nav-container">
              <Link
                to="/"
                onMouseEnter={() => {
                  onMouseNaviText("ホーム");
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
                  onMouseNaviText("ログイン");
                }}
                onMouseLeave={() => {
                  setNaviText("");
                }}
                className="header__nav"
              >
                <SignInIcons />
              </Link>
            </div>
          </>
        )}
        <span className="header__nav-hover-text">{naviText}</span>
      </header>
    </>
  );
};
