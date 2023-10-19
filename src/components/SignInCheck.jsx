import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const SignInCheck = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const Navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      Navigate("/");
    }
  });
};

export const SignOutCheck = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const Navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      Navigate("/signin");
    }
  });
};
