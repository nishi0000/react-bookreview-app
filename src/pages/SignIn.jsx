import { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import "./signin.scss";

export const SignIn = () => {
  const [emailErrorMessage, setEmailErrorMessage] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(false);
  const [signInErrorMessage, setSignInErrorMessage] = useState("");

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
        .post(
          `https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com/signin`,
          values,
        )
        .then((res) => {
          console.log(res.data);
          setSignInErrorMessage("");
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

  return (
    <div>
      <main className="signin">
        <h2>SignIn</h2>
        <p className="error-message"></p>
        <form className="signin-form" onSubmit={handleSubmit}>
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
          {emailErrorMessage && (
            <p className="email-errormessage">{errors.email}</p>
          )}
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
          <br />
          {passwordErrorMessage && (
            <p className="password-errormessage">{errors.password}</p>
          )}
          <div className="signin-button-sp">
            <button
              type="submit"
              className="signin-button"
              onClick={onClickSignInButton}
            >
              サインイン
            </button>
            {signInErrorMessage && <p>{signInErrorMessage}</p>}
          </div>
        </form>
        <Link to="/signup">新規作成</Link>
      </main>
    </div>
  );
};

export default SignIn;
