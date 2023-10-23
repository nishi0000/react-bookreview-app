import "./detailreview.scss";
import { useEffect, useState } from "react";
import { url } from "../const";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";


export const Detail = () => {
  const [bookData, setBookData] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const token = useSelector((state) => state.auth.userToken);
  const params = useParams();

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

  const onClickDelete = () => {
    axios // ユーザー情報を取得・セットする
      .delete(`${url}/books/${params.bookId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <main className="bookreview">{isLoading ? (<p>ロード中</p>):(<>
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
    </>
)}
        </main>

  );
};

export default Detail;
