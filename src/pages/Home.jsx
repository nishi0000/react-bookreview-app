import axios from "axios";
import { url } from "../const";
import { useEffect, useState } from "react";

export const Home = () => {
  const [bookReviewData, setBookReviewData] = useState();// eslint-disable-line no-unused-vars
  const [loading,setLoading] =useState(false);

  useEffect(() => {
    axios
      .get(`${url}/public/books`)
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
      <p>ほーむ画面</p>
      <ul>
        {!loading ? (<p>ロード中</p>):
        (
        bookReviewData.map((data,index)=>{
          console.log(data);
          return(
            <>
            <li key={index}>タイトル：{data.title}</li>
            <p>あらすじ:{data.detail}</p>
            <p>レビュー:{data.review}</p>
            <p>レビュワー：{data.reviewer}</p>
            </>
          );}))}
      </ul>
    </>
  );
};

export default Home;
