// import React, { useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
import { useFormik } from "formik";
import "./signin.scss";

export const SignIn = () => {

    // validate関数を定義
    const validate = (values) => {
      const errors = {};
  
      if (!values.email) {
        errors.email = '入力が必須の項目です。';
      }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = '正しいメールアドレスの形式ではありません。';}
      if (!values.password) {
          errors.password = '入力が必須の項目です。';
        }
      return errors;
    };
  
    const { handleChange, handleSubmit, values, errors } = useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      onSubmit: (values) => {
        console.log(values);
      },
      validate, // validate:validateの略
    });
  

  return (
    <div>
      <main className="signin">
        <h2>SignIn</h2>
        <p className="error-message"></p>
        <form className="signin-form" onSubmit={handleSubmit}>
          <label className="email-label" role="label">メールアドレス</label>
          <br />
          <input
            id="email"
            name="email"
            className="email-input"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <div className="email-errormessage">{errors.email}</div>}
          <br />
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
          {errors.password && <div className="password-errormessage">{errors.password}</div>}
          <br />
          <div className="signin-button-sp">
            <button type="submit" className="signin-button">
              サインイン
            </button>
          </div>
        </form>
        {/* <Link to="/signup">新規作成</Link> */}
      </main>
    </div>
  );
};

export default SignIn;