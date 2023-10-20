import { useSelector } from "react-redux";
import { url } from "../const";
import axios from "axios";
import "./newreview.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignOutCheck } from "../components/SignInCheck";

export const NewReview = () => {
  const [title, setTitle] = useState("");
  const [bookUrl, setBookUrl] = useState("");
  const [detail, setDetail] = useState("");
  const [review, setReview] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleBookUrlChange = (e) => setBookUrl(e.target.value);
  const handleDetailChange = (e) => setDetail(e.target.value);
  const handleReviewChange = (e) => setReview(e.target.value);
  const token = useSelector((state) => state.auth.userToken);
  const Navigate = useNavigate();

  SignOutCheck();

  const onClickNewReview = (event) => {
    event.preventDefault();
    axios
      .post(
        `${url}/books`,
        { title, url: bookUrl, detail, review },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        Navigate("/");
      })
      .catch((res) => {
        console.log(res);
        setErrorMessage(`投稿に失敗しました。${res}`)
      });
  };

  return (
    <>
      <main className="new-bookreview">
        <h2 className="new-bookreview-title">New Book Review</h2>
        <form className="new-book-form" onSubmit={onClickNewReview}>
          <label>タイトル</label>
          <br />
          <input
            type="text"
            className="new-review-title-input"
            onChange={handleTitleChange}
            value={title}
            required
          ></input>
          <br />
          <label>URL</label>
          <br />
          <input
            type="text"
            className="new-book-url-input"
            onChange={handleBookUrlChange}
            value={bookUrl}
            required
          ></input>
          <br />
          <label>詳細</label>
          <br />
          <textarea
            className="new-book-detail-input"
            onChange={handleDetailChange}
            value={detail}
            required
          ></textarea>
          <br />
          <label>レビュー内容</label>
          <br />
          <textarea
            className="new-book-review-input"
            onChange={handleReviewChange}
            value={review}
            required
          ></textarea>
          <br />
          <div className="new-book-submit-container">
            <button className="new-book-submit-button" type="submit">
              投稿する
            </button>
            <p className="error-message">{errorMessage}</p>
            
          </div>
        </form>
      </main>
    </>
  );
};

export default NewReview;
