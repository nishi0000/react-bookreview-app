import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import "./signin.scss";
import { url } from "../const";
import { useDispatch } from "react-redux";
import { signIn } from "../features/AuthSlice";
import { useCookies } from "react-cookie";
import { pageTop } from "../features/PageSlice";
import { userNameGet } from "../features/UserSlice";

export const SignIn = () => {
  const [emailErrorMessage, setEmailErrorMessage] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(false);
  const [signInErrorMessage, setSignInErrorMessage] = useState("");
  const [passwordDisplay, setPasswordDisplay] = useState(false);
  const inputElementPassword = useRef(null);
  const [cookies, setCookie, removeCookie] = useCookies(); // eslint-disable-line no-unused-vars
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  // バリデーションの設定
  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "入力が必須の項目です。";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "正しいメールアドレスの形式ではありません。";
    }
    if (!values.password) {
      errors.password = "入力が必須の項目です。";
    }
    return errors;
  };

  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      axios
        .post(`${url}/signin`, values)
        .then((res) => {
          console.log(res.data);
          setSignInErrorMessage("");
          dispatch(signIn());// ログイン処理
          dispatch(pageTop());// ログインに成功したらレビュートップに行くように
          setCookie("token", res.data.token);
          Navigate("/");
          axios// ユーザー情報を取得・セットする
            .get(`${url}/users`, {
              headers: {
                authorization: `Bearer ${res.data.token}`,
              },
            })
            .then((res) => {
              console.log(res);
              setCookie("name", res.data.name);// データ保持のためクッキーにセット
              dispatch(userNameGet(res.data.name));// グローバルステートにセット
            });
        })
        .catch((res) => {
          console.log(res.response.data);
          setSignInErrorMessage(res.response.data.ErrorMessageJP);
        });
    },
    validate,
  });

  const onClickSignInButton = () => {
    if (errors.email !== "") {
      setEmailErrorMessage(true);
    }
    if (errors.password !== "") {
      setPasswordErrorMessage(true);
    }
  };

  // パスワードの表示非表示
  const onClickPassword = () => {
    if (inputElementPassword.current.type === "password") {
      inputElementPassword.current.type = "text";
      setPasswordDisplay(true);
    } else {
      inputElementPassword.current.type = "password";
      setPasswordDisplay(false);
    }
  };

  return (
    <div>
      <main className="signin-main">
        <h2>ログイン</h2>
        <form className="signin-form" onSubmit={handleSubmit}>
          <label className="email-label" role="label">
            メールアドレス
          </label>
          <input
            id="email"
            name="email"
            className="email-input"
            value={values.email}
            onChange={handleChange}
          />
          {emailErrorMessage && (
            <p className="email-errormessage">{errors.email}</p>
          )}
          <label className="password-label">パスワード</label>
          <div className="password-button-container">
            <input
              ref={inputElementPassword}
              id="password"
              name="password"
              type="password"
              className="password-input"
              value={values.password}
              onChange={handleChange}
              autoComplete="off"
            />
            <button
              onClick={onClickPassword}
              type="button"
              className="password-button"
            >
              {passwordDisplay ? "非表示" : "表示"}
            </button>
          </div>
          {passwordErrorMessage && (
            <p className="password-errormessage">{errors.password}</p>
          )}
          <div className="signin-button-container">
            <Link to="/signup">新規作成</Link>

            <button
              type="submit"
              className="signin-button"
              onClick={onClickSignInButton}
            >
              ログイン
            </button>
          </div>
        </form>
        <br />
        {signInErrorMessage && <p>{signInErrorMessage}</p>}
      </main>
    </div>
  );
};

export default SignIn;
