import axios from "axios";
import { url } from "../const";
import { useEffect, useState } from "react";
import "./home.scss";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { Pagination } from "../components/Pagination";
import { pageNumberGet } from "../features/PageSlice";

export const Home = () => {
  const [bookReviewData, setBookReviewData] = useState();
  const [loading, setLoading] = useState(false);
  const auth = useSelector((state) => state.auth.isSignIn);
  const page = useSelector((state) => state.page.pageIndex);
  const dispatch = useDispatch();

  const [cookies] = useCookies();

  useEffect(() => {
    if (auth) {
      axios
        .get(`${url}/books/?offset=${page}`, {
          headers: {
            authorization: `Bearer ${cookies.token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setBookReviewData(res.data);
          setLoading(true);
          dispatch(pageNumberGet(res.data.length));

        })
        .catch((res) => {
          console.log(res.response.data);
        });
    } else {
      axios
        .get(`${url}/public/books?offset=${page}`)
        .then((res) => {
          console.log(res.data);
          setBookReviewData(res.data);
          setLoading(true);
          dispatch(pageNumberGet(res.data.length));
        })
        .catch((res) => {
          console.log(res.response.data);
        });
    }
  }, [page]);

  return (
    <>
      <h2 className="home-title title-column">Book Review List</h2>
      {!loading ? (
        <p className="review__loading">ロード中</p>
      ) : (
        bookReviewData.map((data, index) => {
          return (
            <div key={index} className="review review-column">
              <h3 className="review__title">タイトル：{data.title}</h3>
              <p className="review__detail">あらすじ:{data.detail}</p>
              <p className="review__comment">レビュー:{data.review}</p>
              <p className="review__url">URL:{data.url}</p>
              <p className="review__reviewer">レビュワー：{data.reviewer}</p>
            </div>
          );
        })
      )}
      <Pagination />
    </>
  );
};

export default Home;
