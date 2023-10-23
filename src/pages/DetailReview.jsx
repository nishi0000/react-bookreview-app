import "./detailreview.scss";
import { useEffect, useState } from "react";
import { url } from "../const";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const Detail = () => {
  const [bookData, setBookData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = useSelector((state) => state.auth.userToken);
  const params = useParams();
  const Navigate = useNavigate();

  useEffect(() => {
    axios // 詳細情報を取得・セットする
      .get(`${url}/books/${params.bookId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setBookData(res.data);
        setIsLoading(false);
      });
  }, []);

  const onClickBack = () => {
    Navigate(-1);
  }

  return (
    <main className="bookreview">
      {isLoading ? (
        <p className="loading">ロード中</p>
      ) : (
        <>
          <h2 className="bookreview-title">Book Review</h2>

          <div className="bookreview-container">
          <h3 className="bookreview-book-title">{bookData.title}</h3>

          <h4 className="bookreview-detail-title">詳細 </h4>
          <p className="bookreview-detail">{bookData.detail}</p>

          <h4 className="bookreview-detail-title">レビュー </h4>
          <p className="bookreview-detail">{bookData.review}</p>

          <div className="bookreview-detail-url">URL:{bookData.url}</div>
          <div className="bookreview-detail-reviewer">レビュワー :{bookData.reviewer}</div>
          </div>

          <div className="bookreview-back" onClick={onClickBack}>戻る</div>
        </>
      )}
    </main>
  );
};

export default Detail;
