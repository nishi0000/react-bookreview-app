import { useDispatch, useSelector } from "react-redux";
import { pageBack, pageMove, pageTop } from "../features/PageSlice";
import "./pagination.scss";
import { url } from "../const";
import axios from "axios";
import { HashLink } from "react-router-hash-link";
import { useState } from "react";

export const Pagination = () => {
  const page = useSelector((state) => state.page.pageIndex);
  const dispatch = useDispatch();
  const [moveButton, setMoveButton] = useState("");

  const onClickPageMove = () => {
    dispatch(pageMove());
    axios
      .get(`${url}/public/books?offset=${page + 20}`)
      .then((res) => {
        console.log(res.data);
        setMoveButton(res.data.length);
      })
      .catch((res) => {
        console.log(res.response.data);
      });
  };

  const onClickPageBack = () => {
    dispatch(pageBack());
    setMoveButton(10);
  };

  const onClickTop = () => {
    dispatch(pageTop());
    setMoveButton(10);
  };


  return (
    <div className="paginationlink">
      {page === 0 || (
        <HashLink to="/#top" className="pageback" onClick={onClickPageBack}>
          戻る
        </HashLink>
      )}
      {page < 9 || (
        <HashLink to="/#top" className="pagetop" onClick={onClickTop}>
          最初に戻る
        </HashLink>
      )}

      {moveButton === 0 || (
        <HashLink to="/#top" className="pagemove" onClick={onClickPageMove}>
          進む
        </HashLink>
      )}
      </div>
  );
};
