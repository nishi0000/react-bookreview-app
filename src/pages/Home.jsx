import axios from "axios";
import { url } from "../const";
import { useEffect, useState } from "react";
import "./home.scss";
import { useSelector } from "react-redux";
import { Pagination } from "../components/Pagination";
import { Link, useNavigate } from "react-router-dom";

export const Home = () => {
  const [bookReviewData, setBookReviewData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const Navigate = useNavigate();
  const auth = useSelector((state) => state.auth.isSignIn);
  const token = useSelector((state) => state.auth.userToken);
  const page = useSelector((state) => state.page.pageIndex);

  useEffect(() => {
    if (auth) {
      // ログイン済なら認証が必要なレビューページへ
      axios
        .get(`${url}/books?offset=${page}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setBookReviewData(res.data);
          setIsLoading(false);
        })
        .catch((res) => {
          console.log(res.response.data);
        });
    } else {
      // 未ログインなら認証が不要なレビューページへ
      axios
        .get(`${url}/public/books?offset=${page}`)
        .then((res) => {
          console.log(res.data);
          setBookReviewData(res.data);
          setIsLoading(false);
        })
        .catch((res) => {
          console.log(res.response.data);
        });
    }
  }, [page]); // pageが更新されるたびに取得する

  const onClickSubmitLog = (id) => {// ログの送信
    axios
        .post(`${url}/logs`, {
          selectBookId: `${id}`
        },{
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
  }

  const onClickEdit = (id) => {
    Navigate(`/edit/${id}`);
  }

  return (
    <main>
      <h2 className="home-title title-column">Book Review List</h2>
      {isLoading ? (
        <p className="review__loading">ロード中</p>
      ) : (
        bookReviewData.map((data, index) => {
          return (
            <div key={index} className="review review-column">
              {auth ? (<Link
                to={`detail/${data.id}`}
                className="review__container"
                onClick={()=> onClickSubmitLog(data.id)}
              >
                <h3 className="review__title">タイトル：{data.title}</h3>
              </Link>):(
                <h3 className="review__title">タイトル：{data.title}</h3>
              )}
              <p className="review__detail">詳細:{data.detail}</p>
              <p className="review__comment">レビュー:{data.review}</p>
              <p className="review__url">URL:{data.url}</p>
              <p className="review__reviewer">レビュワー：{data.reviewer}</p>
              {data.isMine &&<div className="review__link" onClick={() =>onClickEdit(data.id)}>編集する</div>}
            </div>
          );
        })
      )}
      <Pagination />
    </main>
  );
};

export default Home;
