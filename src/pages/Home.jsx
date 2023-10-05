import axios from "axios";
// import Compressor from "compressorjs";
import { useState } from "react";

export const Home = () => {
  const [iconImage, setIconImage] = useState();
  const [profileImage, setProfileImage] = useState();
  const file = {
    icon : iconImage,
  }

  const handleSubmit = () => {
    axios
      .post(
        "https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com/uploads",
        file,
        {
          headers: {
            "content-type": "multipart/form-data",
            authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTY1NjIyNzgsImlhdCI6MTY5NjQ3NTg3OCwic3ViIjoiNTQ1NDY1NTczNTQiLCJ1c2VyX2lkIjoiMGI2YjFiMTYtMjc1MS00Y2NmLTk1M2ItMTQ1Mzg3MmM3ZTc3In0.qbSFYJImxSCykIm_JrJcRwlzhEfv25D8xXAJotHF5O0`,
          },
        }
      )
      .then((response) => {
        console.log(response);
      });
  };

  const onFileInputChange = (e) => {
    if (!e.target.files) return;
    const fileObject = e.target.files[0];
    setProfileImage(window.URL.createObjectURL(fileObject));
    setIconImage(fileObject);
    console.log(profileImage);
  };

  return (
    <>
      <p>ファイル送信</p>

      <input
        accept="image/png, image/jpeg"
        multiple
        type="file"
        onChange={onFileInputChange}
      />
      <img src={profileImage}/>
      <button onClick={handleSubmit}>送信</button>
    </>
  );
};

export default Home;

//   const [image,setImage] = useState("");

//   const onClickTest = () => {

//     const file = new FormData()
//     file.append("image", image[0]);

//     axios
//       .put(
//         `https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com/users`,
//         {name:"testttft"},
//         {
//           headers: {
//             authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTY1NjIyNzgsImlhdCI6MTY5NjQ3NTg3OCwic3ViIjoiNTQ1NDY1NTczNTQiLCJ1c2VyX2lkIjoiMGI2YjFiMTYtMjc1MS00Y2NmLTk1M2ItMTQ1Mzg3MmM3ZTc3In0.qbSFYJImxSCykIm_JrJcRwlzhEfv25D8xXAJotHF5O0`,
//           },
//         },
//       )
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((res) => {
//         console.log(res);
//       });

//       axios
//       .post(
//         `https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com/uploads`,
//         file,
//         {
//         headers: {
//           // 'Content-Type': 'multipart/form-data;',
//           authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTY1NjYxMTAsImlhdCI6MTY5NjQ3OTcxMCwic3ViIjoiNTQ1NDY1NTczNTQiLCJ1c2VyX2lkIjoiOTMyMzQyMjItMjhmMy00N2FlLTk5OWEtNzk2MTg2MDM1NjdiIn0.VKizhX_XaM_ZdmZw_IXolj3w8GhfEVYVcmRv84u6Q_0`,
//         },
//       }
//       )
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((res) => {
//         console.log(res);
//       });

//   };

//   const onClickImage = () => {
//     console.log(image);

//   }

//   return (
//     <>
//       <p>ほーむがめん</p>

//       <button onClick={onClickTest}>テストボタン</button><br />

//       <input accept="image/*" multiple type="file"
// onChange={event => setImage(event.target.files)} />
//       <button onClick={onClickImage}>送信</button>
//     </>
//   );
// };

// export default Home;
