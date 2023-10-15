import { useDispatch, useSelector } from "react-redux";
import { pageBack, pageMove,pageTop } from "../features/PageSlice";
import "./header.scss"; 
import { url } from "../const";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';

export const Pagination = () => {
  const page = useSelector((state) => state.page.pageIndex);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const returnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const onClickPageMove = () => {
    dispatch(pageMove());
    navigate("/");
  };

  const onClickPageBack = () => {
    dispatch(pageBack());
    returnTop();
  };

  const onClickTop = () => {
    dispatch(pageTop());
    returnTop();
  };

  const test = () => {
    axios
      .post(
        `${url}/books/`,{title: "test", url: "testttt", detail: "testttt", review: "testttt"},
        {
          headers: {
            authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTc0MzIyNTEsImlhdCI6MTY5NzM0NTg1MSwic3ViIjoiNTQ1NDY1NTczNTQiLCJ1c2VyX2lkIjoiYzA4Nzc3N2EtMzQwOS00MzY1LWIzMDUtYWQ5NGRjYzYyYTExIn0.HLh8P7CT7Crh3zoRzhmf_N2kgARFh9k3hdbmNwaOuNM`,
          },
        },
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
      <HashLink to="/#top" onClick={onClickPageMove}>進む</HashLink>
      <button onClick={test}>テスト投稿</button>
      {page < 9 || <HashLink to="/#top" onClick={onClickTop}>最初に戻る</HashLink>}
      {page === 0 || <HashLink to="/#top" onClick={onClickPageBack}>戻る</HashLink>}
      <HashLink to="/signin#top">test</HashLink>
      
    </>
  );
};
