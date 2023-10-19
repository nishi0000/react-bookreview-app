import { useSelector } from "react-redux";
import { url } from "../const";
import axios from "axios";

export const NewReview = () => {
  const token = useSelector((state) => state.auth.userToken);

  const onClickNewReview = () => {
    axios
      .post(
        `${url}/books`,
        {
          title: "string",
          url: "string",
          detail: "string",
          review: "string",
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log(res);
      });
  };

  return (
    <>
      レビュー新規画面です。
      <button onClick={onClickNewReview}>投稿</button>
    </>
  );
};

export default NewReview;
