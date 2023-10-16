import { useDispatch, useSelector } from "react-redux";
import "./header.scss";
import { Link, useNavigate, } from "react-router-dom";
import { useCookies } from "react-cookie";
import { signOut } from "../features/AuthSlice";
import { BookIcons, SignOutIcons, UserIcons } from "./Heroicons";

export const Header = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const name = useSelector((state) => state.name.userName);
  const [cookies, setCookie, removeCookie] = useCookies(); // eslint-disable-line no-unused-vars
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickSignOut = () => {

    removeCookie("token");
    navigate("/signin");
    dispatch(signOut());
    
  }

  return (<>
    <header className="header">
      <div className="header__log-container">
      <Link to="/" className="header__nav">
        <h1 className="header__logo">Book Review Web</h1>
        <h1 className="header__logo-sp">
          Book
          <br />
          Review
          <br />
          Web
        </h1>
      </Link>
      {auth && 
        <Link to="profile" className="header__nav header__gest">
          {name}様
        </Link>}

        </div>
      
      <div className="header__icon">
      {auth ? (<>
        <Link to="signin" onClick={onClickSignOut} className="header__nav">
        <SignOutIcons />
        </Link>
        <Link to="profile" className="header__nav">
        <UserIcons />
        </Link>
        <Link to="signin" onClick={onClickSignOut} className="header__nav">
        <BookIcons />
        </Link>

        </>
        
      ) : (
        <Link to="signin" className="header__nav">
          ログイン
        </Link>
      )}
      </div>
    </header>
    </>
  );
};
