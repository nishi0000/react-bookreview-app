import axios from "axios";
import { url } from "../const";
import { useState } from "react";

export const Test = () => {
  const [name, setName] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [token, setToken] = useState();

  const onCilikCheck = () => {
    axios
      .get(`${url}/users`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setName(res.data.name);
        setImageUrl(res.data.iconUrl);
      })
      .catch((res) => {
        console.log(res);
      });
  };

  const onChangeToken = (e) => {
    setToken(e.target.value);
    console.log(token);
  };

  return (
    <>
      <input type="text" onChange={onChangeToken}></input>
      <button onClick={onCilikCheck}>ユーザー情報取得</button>
      <p>名前：{name}</p>
      <img src={`${imageUrl}`} />
    </>
  );
};

export default Test;
