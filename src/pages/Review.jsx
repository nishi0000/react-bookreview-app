import "./review.scss";
import { useEffect, useState } from "react";
import { url } from "../const";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Review = () => {
  const bookId = useSelector((state) => state.bookId.bookId);
  const token = useSelector((state) => state.auth.userToken);
  const [bookData, setBookData] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    axios // ユーザー情報を取得・セットする
      .get(`${url}/books/${bookId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setBookData(res.data);
      });
  }, []);

  const onClickDelete = () => {
    axios // ユーザー情報を取得・セットする
      .delete(`${url}/books/${bookId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        Navigate("/");
      });
  };

  return (
    <>
      <main className="bookreview">
        <h2 className="bookreview-title">Book Review</h2>
        <h3>
          {bookData.title}
        </h3>
        <p>
          URL
          <br />
          {bookData.url}
        </p>
        <p>
          レビュワー
          <br />
          {bookData.reviewer}
        </p>
        <p>
          詳細
          <br />
          {bookData.detail}
        </p>
        <p>
          レビュー
          <br />
          {bookData.review}
        </p>
        {bookData.isMine && (
          <div className="bookreview-edit-button">
            <button>編集</button>
            <button onClick={onClickDelete}>削除</button>
          </div>
        )}
      </main>
    </>
  );
};

export default Review;
