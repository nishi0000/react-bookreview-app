import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";

export const SignUp = () => {
  const [nameErrorMessage, setNameErrorMessage] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(false);
  const [signUpErrorMessage, setSignUpErrorMessage] = useState("");

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "入力が必須の項目です。";
    }
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
      name: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      axios
        .post(
          `https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com/users`,
          values
        )
        .then((res) => {
          console.log(res.data);
          setSignUpErrorMessage("");
        })
        .catch((res) => {
          console.log(res.response.data);
          setSignUpErrorMessage(res.response.data.ErrorMessageJP);
        });
    },
    validate,
  });

  const onClickSignInButton = () => {
    if (errors.name !== "") {
      setNameErrorMessage(true);
    }
    if (errors.email !== "") {
      setEmailErrorMessage(true);
    }
    if (errors.password !== "") {
      setPasswordErrorMessage(true);
    }
  };

  return (
    <div>
      <main className="signup">
        <h2>SignUp</h2>
        <p className="error-message"></p>
        <form className="signup-form" onSubmit={handleSubmit}>
          <label className="name-label" role="label">
            ユーザーネーム
          </label>
          <br />
          <input
            id="name"
            name="name"
            className="name-input"
            value={values.name}
            onChange={handleChange}
          />
          <br />
          {nameErrorMessage && (
            <p className="name-errormessage">{errors.name}</p>
          )}
          <label className="email-label" role="label">
            メールアドレス
          </label>
          <br />
          <input
            id="email"
            name="email"
            className="email-input"
            value={values.email}
            onChange={handleChange}
          />
          <br />
          {emailErrorMessage && <p className="email-errormessage">{errors.email}</p>}
          <label className="password-label">パスワード</label>
          <br />
          <input
            id="password"
            name="password"
            type="password"
            className="password-input"
            value={values.password}
            onChange={handleChange}
            autoComplete="off"
          />
          {passwordErrorMessage && (
            <p className="password-errormessage">{errors.password}</p>
          )}
          <div className="signup-button-sp">
            <button
              type="submit"
              className="signup-button"
              onClick={onClickSignInButton}
            >
              サインアップ
            </button>
            {signUpErrorMessage && <p>{signUpErrorMessage}</p>}
          </div>
        </form>
        <Link to="/signin">ログイン</Link>
      </main>
    </div>
  );
};
