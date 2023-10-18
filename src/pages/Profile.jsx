import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../const";
import { useDispatch, useSelector } from "react-redux";
import { userNameGet } from "../features/UserSlice";
import { SignOutCheck } from "../components/SignInCheck";


export const Profile = () => {
    const [userName,setUserName] = useState("");
    const [userIcon,setUserIcon] = useState("");
    const token = useSelector((state) => state.auth.userToken);
    const dispatch = useDispatch();
    
    SignOutCheck();

    useEffect(() => {
      if(token){
    axios// ユーザー情報を取得・セットする
    .get(`${url}/users`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res);
      setUserName(res.data.name);
      setUserIcon(res.data.iconUrl);
    });}
}, []);


    const onClickUpdate = () => {
        axios// ユーザー情報を取得・セットする
        .put(`${url}/users`, {name:"test"}, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          setUserName(res.data.name);
          dispatch(userNameGet(res.data.name))
        });
    }


    return(<>

       <p>プロフィール画面です！</p> 
       <img src={userIcon} alt="usericon"></img>
       <p>{userName}</p>
       <input type="text"></input>
       <button onClick={onClickUpdate}>更新</button>
       </>
    )

};

export default Profile;
