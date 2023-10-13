import "./signup.scss";
import axios from "axios";
import Compressor from "compressorjs";
import { useFormik } from "formik";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../const";
import { useDispatch } from "react-redux";
import { signIn } from "../features/AuthSlice";
import { useCookies } from "react-cookie";

export const SignUp = () => {
  const [nameErrorMessage, setNameErrorMessage] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(false);
  const [signUpErrorMessage, setSignUpErrorMessage] = useState("");
  const [token, setToken] = useState();
  const [uploadIconImage, setUploadIconImage] = useState("");
  const [passwordDisplay, setPasswordDisplay] = useState(false);
  const inputElementPassword = useRef(null);
  const [cookies, setCookie, removeCookie] = useCookies(); // eslint-disable-line no-unused-vars
  const dispatch = useDispatch();
  const Navigate = useNavigate();

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
      console.log(e.target.files[0]);
      new Compressor(file, {
        quality: 0.6,
        maxHeight: 200,
        maxWidth: 200,
        convertSize: 1000000,
        success(result) {
          const resultfile = new File([result], `${result.name}`, {
            type: `${result.type}`,
          });
          console.log(resultfile);
          setUploadIconImage(resultfile);
        },
      });
    } else {
      // ファイルが選択されていなければ空にする
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
          setSignUpErrorMessage("");
          setCookie("token", res.data.token);

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
        .then(() => {
          dispatch(signIn());
          Navigate("/");      
        })
        .catch((res) => {
          console.log(res.response.data);
          setSignUpErrorMessage(res.response.data.ErrorMessageJP);
        });
    },
    validate,
  });

  const onClickSignInButton = () => {
    // クリック時にエラーがあればエラーを表示する
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

  // const [passwordGenerate,setPasswordGenerate] = useState("");

  // パスワード自動生成

  // const onClickPasswordAutoGenerate = () => {
  //   const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  //   const alphabetUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  //   const numbers = '0123456789';

  //   const passBase  = alphabet + alphabetUpper + numbers;

  //   const len = 8; // 8桁
  //   let password='';

  //   for (let i = 0; i < len; i++) {
  //       password += passBase.charAt(Math.floor(Math.random() * passBase.length));
  //   }
  //   console.log(password);
  //   setPasswordGenerate(password);
  //   values.password = passwordGenerate;

  // }

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
          <div className="password-button-container">
            <input
              ref={inputElementPassword}
              id="password"
              name="password"
              type="password"
              className="password-input"
              value={values.password}
              // value={passwordGenerate}
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
          {/* <button type="button" onClick={onClickPasswordAutoGenerate}>パスワード自動生成！</button>
          <p>{passwordGenerate}</p> */}
          <label className="image-label" role="label">
            アイコン画像の登録
          </label>
          <input
            className="file-input"
            accept="image/png, image/jpeg"
            type="file"
            onChange={onFileInputChange}
          />
          {uploadIconImage && (
            <img
              src={window.URL.createObjectURL(uploadIconImage)}
              className="icon-image"
            />
          )}
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
