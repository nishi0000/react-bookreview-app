import React from "react";
import { Route, Routes } from "react-router-dom";
import { SignInHome } from "../pages/SignInHome";
import { NotFound } from "../pages/NotFound";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
// import { useSelector } from "react-redux";
// import SignOutHome from "../pages/SignOutHome";

export const Router = () => {
  // const auth = useSelector((state) => state.auth.isSignIn);
  return (
    <Routes>
      <Route exact path="/signup" element={<SignUp />} />
      <Route exact path="/signin" element={<SignIn />} />
      <Route exact path="/" element={<SignInHome />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
