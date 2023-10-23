import { useSelector } from "react-redux";
import { url } from "../const";
import axios from "axios";
import "./editreview.scss";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SignOutCheck } from "../components/SignInCheck";

export const Edit = () => {
    const [title, setTitle] = useState("");
    const [bookUrl, setBookUrl] = useState("");
    const [detail, setDetail] = useState("");
    const [review, setReview] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleBookUrlChange = (e) => setBookUrl(e.target.value);
    const handleDetailChange = (e) => setDetail(e.target.value);
    const handleReviewChange = (e) => setReview(e.target.value);
    const Navigate = useNavigate();
    const token = useSelector((state) => state.auth.userToken);
    const param = useParams();
  
    SignOutCheck();

    useEffect(()=>{// データの取得
        axios
        .get(
          `${url}/books/${param.bookId}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        )
        .then((res) => {
          console.log(res.data);
          setTitle(res.data.title);
          setBookUrl(res.data.url);
          setDetail(res.data.detail);
          setReview(res.data.review);
        })
        .catch((res) => {
          console.log(res);
          setErrorMessage(`投稿に失敗しました。${res}`);
        });

    },[])
  
    const onSubmitEditReview = (event) => { // データの更新
      event.preventDefault();
      axios
        .put(
          `${url}/books/${param.bookId}`,
          { title, url: bookUrl, detail, review },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        )
        .then((res) => {
          console.log(res.data);
          Navigate("/");
        })
        .catch((res) => {
          console.log(res);
          setErrorMessage(`投稿に失敗しました。${res}`);
        });
    };



      const onClickDelete = () => { // データの削除
        axios
          .delete(`${url}/books/${param.bookId}`, {
            headers: {
              authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            console.log(res.data);
            Navigate("/");
            setModalOpen(false);
            
          });
      };

  return (
    <>
    <main className="edit-bookreview">
    <h2 className="edit-bookreview-title">Edit Book Review</h2>
    <form className="edit-book-form" onSubmit={onSubmitEditReview}>
      <label>タイトル</label>
      <br />
      <input
        type="text"
        className="edit-review-title-input"
        onChange={handleTitleChange}
        value={title}
        required
      ></input>
      <br />
      <label>URL</label>
      <br />
      <input
        type="text"
        className="edit-book-url-input"
        onChange={handleBookUrlChange}
        value={bookUrl}
        required
      ></input>
      <br />
      <label>詳細</label>
      <br />
      <textarea
        className="edit-book-detail-input"
        onChange={handleDetailChange}
        value={detail}
        required
      ></textarea>
      <br />
      <label>レビュー内容</label>
      <br />
      <textarea
        className="edit-book-review-input"
        onChange={handleReviewChange}
        value={review}
        required
      ></textarea>
      <br />
      <div className="edit-book-submit-container">
        <button className="edit-book-submit-button" type="submit">
          更新
        </button>
        <button className="edit-book-delete-button" onClick={()=>setModalOpen(true)}>
          削除
        </button>
        {modalOpen && (
                <div className="header__modal-overlay">
                  <div className="header__modal-content">
                    <p>レビューを削除しますか？</p>
                      <button
                        className="header__modal-button"
                        onClick={() => {onClickDelete()}}
                      >
                        はい
                      </button>
                      <button
                        className="header__modal-button"
                        onClick={() => {setModalOpen(false)}}
                      >
                        いいえ
                      </button>
                  </div>
                </div>
              )}
        <p className="error-message">{errorMessage}</p>
      </div>
    </form>

  </main>
</>
  );
};

export default Edit;
