import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import Profile from "../pages/Profile";
import NewReview from "../pages/NewReview";
import Review from "../pages/Review";

export const Router = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/signin" element={<SignIn />} />
      <Route exact path="/signup" element={<SignUp />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route exact path="/new" element={<NewReview />} />
      <Route exact path="/review" element={<Review />}>
        <Route path=":reviewId" element={<Review />} />
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
