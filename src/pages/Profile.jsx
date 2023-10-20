import axios from "axios";
import "./profile.scss";
import { useEffect, useState } from "react";
import { url } from "../const";
import { useDispatch, useSelector } from "react-redux";
import { userNameGet } from "../features/UserSlice";
import { SignOutCheck } from "../components/SignInCheck";
import human from "../images/human.png";
import Compressor from "compressorjs";
import { useCookies } from "react-cookie";

export const Profile = () => {
  const [userName, setUserName] = useState("");
  const [userIcon, setUserIcon] = useState("");
  const [uploadIconImage, setUploadIconImage] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(); // eslint-disable-line no-unused-vars
  const token = useSelector((state) => state.auth.userToken);
  const dispatch = useDispatch();
  const handleNameChange = (e) => setUserName(e.target.value);

  SignOutCheck();

  useEffect(() => {
    axios // ユーザー情報を取得・セットする
      .get(`${url}/users`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setUserName(res.data.name);
        setUserIcon(res.data.iconUrl);
        setCookie("name", res.data.name);
      });
  }, []);

  const onClickUpdate = (event) => {
    event.preventDefault();
      axios // ユーザー情報を取得・セットする
        .put(
          `${url}/users`,
          { name: `${userName}` },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          setUserName(res.data.name);
          setCookie("name", res.data.name);
          dispatch(userNameGet(res.data.name));
        });

  };

  const onFileInputChange = (e) => {
    // アップロードする画像を表示する
    if (e.target.files.length > 0) {
      // ファイルが選択されていればセット
      const file = e.target.files[0];
      console.log(e.target.files[0]);
      new Compressor(file, {
        quality: 0.6,
        maxHeight: 200,
        maxWidth: 200,
        convertSize: 1000000,
        success(result) {
          const resultfile = new File([result], `${result.name}`, {
            type: `${result.type}`,
          });
          console.log(resultfile);
          setUploadIconImage(resultfile);
        },
      });
    } else {
      // ファイルが選択されていなければ空にする
      setUploadIconImage("");
    }
  };

  const onClickImageUpload = (event) => {
    event.preventDefault();
    if (uploadIconImage !== "") {
      // 画像ファイルが選択されていれば実行
      axios
        .post(
          `${url}/uploads`,
          { icon: uploadIconImage },
          {
            headers: {
              "content-type": "multipart/form-data",
              authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .then(() => {
          axios // ユーザー情報を取得・セットする
            .get(`${url}/users`, {
              headers: {
                authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              console.log(res);
              setUserName(res.data.name);
              setUserIcon(res.data.iconUrl);
              setCookie("name", res.data.name);
              setUploadIconImage("");
            });
        });
    }
  };

  return (
    <>
      <form className="profile-container" onSubmit={onClickUpdate}>
        <h2 className="profile-title">Uesr Profile</h2>
        <details>
          <summary className="user-icon-edit">
            <div className="item">
              <div className="item__img">
                {userIcon ? (
                  <img className="usericon" src={userIcon} alt="usericon"></img>
                ) : (
                  <img className="usericon" src={human} alt="usericon"></img>
                )}
              </div>

              <div className="item__text">
                <p>アイコン画像の変更</p>
              </div>
            </div>
          </summary>
          <input
            className="profile-image-input"
            accept="image/png, image/jpeg"
            type="file"
            onChange={onFileInputChange}
          />
          {uploadIconImage && (
            <img
              src={window.URL.createObjectURL(uploadIconImage)}
              className="icon-image"
              alt="user-icon"
            />
          )}
          {uploadIconImage && (
            <button
              className="profile-button"
              type="submit"
              onClick={onClickImageUpload}
            >
              アイコン変更
            </button>
          )}
        </details>

        <br />
        <input
          type="text"
          className="profile-name-input"
          value={userName}
          onChange={handleNameChange}
          required
        ></input>
        <br />
        <button className="profile-button" type="submit">
          名前変更
        </button>
      </form>
    </>
  );
};

export default Profile;
