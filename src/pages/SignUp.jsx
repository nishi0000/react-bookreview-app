import "./signup.scss";
import axios from "axios";
import Compressor from "compressorjs";
import { useFormik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import { url } from "../const";

export const SignUp = () => {
  const [nameErrorMessage, setNameErrorMessage] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(false);
  const [signUpErrorMessage, setSignUpErrorMessage] = useState("");
  const [token, setToken] = useState();
  const [iconImage, setIconImage] = useState();
  const [uploadIconImage, setUploadIconImage] = useState("");

  const validate = (values) => {
    // バリデーション、エラーメッセージの設定
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

  const onFileInputChange = (e) => {
    // アップロードする画像を表示する
    if (e.target.files.length > 0) {
      // ファイルが選択されていればセット
      const file = e.target.files[0];
      new Compressor(file, {
        quality: 0.6,
        maxHeight: 200,
        maxWidth: 200,
        convertSize: 1000000,
        success(result) {
          console.log(result);
          setIconImage(window.URL.createObjectURL(result));
          setUploadIconImage(result);
        },
      });
    } else {
      // ファイルが選択されていなければ空にする
      setIconImage("");
      setUploadIconImage("");
    }
  };

  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      axios
        .post(`${url}/users`, values)
        .then((res) => {
          console.log(res.data);
          setToken(res.data.token);
          setSignUpErrorMessage("新規登録に成功しました！");

          if (uploadIconImage !== "") {
            // 画像ファイルが選択されていれば実行
            axios
              .post(
                `${url}/uploads`,
                { icon: uploadIconImage },
                {
                  headers: {
                    "content-type": "multipart/form-data",
                    authorization: `Bearer ${res.data.token}`,
                  },
                }
              )
              .then((response) => {
                console.log(response);
              });
          }
        })
        .catch((res) => {
          console.log(res.response.data);
          setSignUpErrorMessage(res.response.data.ErrorMessageJP);
        });
    },
    validate,
  });

  const onClickSignInButton = () => {
    // クリック時にエラーメッセージがあればエラーを表示する
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
    <>
      <main className="signup-main">
        <form className="signup-form" onSubmit={handleSubmit}>

              <h2>新規登録</h2>
              <label className="name-label" role="label">
                ユーザーネーム
              </label>
              <input
                id="name"
                name="name"
                className="name-input"
                value={values.name}
                onChange={handleChange}
              />
              {nameErrorMessage && (
                <p className="name-errormessage">{errors.name}</p>
              )}
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
              <input
                id="password"
                name="password"
                type="password"
                className="password-input"
                value={values.password}
                onChange={handleChange}
                autoComplete="off"
              />{" "}
              {passwordErrorMessage && (
                <p className="password-errormessage">{errors.password}</p>
              )}
              <label className="image-label" role="label">
              アイコン画像の登録
              </label>
              <input
                className="file-input"
                accept="image/png, image/jpeg"
                type="file"
                onChange={onFileInputChange}
              />
              {iconImage && <img src={iconImage} className="icon-image" />}
          <div className="button-container">
          <Link to="/signin">ログイン</Link>
          <button
            type="submit"
            className="signup-button"
            onClick={onClickSignInButton}
          >
            新規登録
          </button>


        </div>
        <br />
        {signUpErrorMessage && <p>{signUpErrorMessage}</p>}
        <br />
        <p>{token}</p>
        </form>

      </main>
    </>
  );
};
