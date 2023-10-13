import axios from "axios";
import { url } from "../const";
import { useEffect, useState } from "react";
import "./home.scss";
import { useCookies } from "react-cookie";

export const Home = () => {
  const [bookReviewData, setBookReviewData] = useState();
  const [loading, setLoading] = useState(false);
  const [cookies] = useCookies();


  useEffect(() => {
      axios
        .get(`${url}/books`, {
          headers: {
            authorization: `Bearer ${cookies.token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setBookReviewData(res.data);
          setLoading(true);
        })
        .catch((res) => {
          console.log(res.response.data);
        });
  }, []);




  return (
    <>
      <h2 className="home-title title-column">Book Review List</h2>
      {!loading ? (
        <p className="review__loading">ロード中</p>
      ) : (
        bookReviewData.map((data, index) => {
          console.log(data);
          return (
            <div className="review review-column">
              <h3 key={index} className="review__title">
                タイトル：{data.title}
              </h3>
              <p className="review__detail">あらすじ:{data.detail}</p>
              <p className="review__comment">レビュー:{data.review}</p>
              <p className="review__url">URL:{data.url}</p>
              <p className="review__reviewer">レビュワー：{data.reviewer}</p>
            </div>
          );
        })
      )}
    </>
  );
};

export default Home;
