import { useSelector } from "react-redux";
import { url } from "../const";
import axios from "axios";
import "./newreview.scss";
import { useState } from "react";

export const NewReview = () => {
  const [title, setTitle] = useState("");
  const [bookUrl, setBookUrl] = useState("");
  const [detail, setDetail] = useState("");
  const [review, setReview] = useState("");
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleBookUrlChange = (e) => setBookUrl(e.target.value);
  const handleDetailChange = (e) => setDetail(e.target.value);
  const handleReviewChange = (e) => setReview(e.target.value);
  const token = useSelector((state) => state.auth.userToken);

  const onClickNewReview = () => {
    const data = {
      title: title,
      url: bookUrl,
      detail: detail,
      review: review,
    };

    axios
      .post(`${url}/books`, data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log(res);
      });
  };

  return (
    <>
      <div className="new-book-review-container"></div>
      <h2>New Book Review</h2>

      <input type="text" onChange={handleTitleChange}></input>
      <input type="text" onChange={handleBookUrlChange}></input>
      <input type="text" onChange={handleDetailChange}></input>
      <input type="text" onChange={handleReviewChange}></input>
      <button onClick={onClickNewReview}>投稿</button>
    </>
  );
};

export default NewReview;
