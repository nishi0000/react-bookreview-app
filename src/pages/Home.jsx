import axios from "axios";
// import Compressor from "compressorjs";
import { useState } from "react";

export const Home = () => {
  const [image,setImage] = useState("");
  const handleImageChange = (e) => setImage(e.target.value);
  



  const onClickTest = () => {
    axios
      .put(
        `https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com/users`,
        {name:"testttt"},
        {
          headers: {
            authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTYyMjgzNTgsImlhdCI6MTY5NjE0MTk1OCwic3ViIjoiNTQ1NDY1NTczNTQiLCJ1c2VyX2lkIjoiMGI2YjFiMTYtMjc1MS00Y2NmLTk1M2ItMTQ1Mzg3MmM3ZTc3In0.bOVwm1UmFk2v8cPSnhVagn-FBSk1NPBouMGlo9Luea4`,
          },
        },
      )
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log(res);
      });

      axios
      .post(
        `https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com/uploads`,
        {file:image},
        {          
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTYyMjgzNTgsImlhdCI6MTY5NjE0MTk1OCwic3ViIjoiNTQ1NDY1NTczNTQiLCJ1c2VyX2lkIjoiMGI2YjFiMTYtMjc1MS00Y2NmLTk1M2ItMTQ1Mzg3MmM3ZTc3In0.bOVwm1UmFk2v8cPSnhVagn-FBSk1NPBouMGlo9Luea4`,
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

  const onClickImage = () => {
    console.log(image);

  }




  return (
    <>
      <p>ほーむがめん</p>

      <button onClick={onClickTest}>テストボタン</button><br />

      <input type="file" onChange={handleImageChange}></input>
      <button onClick={onClickImage}>送信</button>
    </>
  );
};

export default Home;
