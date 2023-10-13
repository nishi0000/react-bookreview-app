import { useSelector } from "react-redux";
import "./header.scss";
import { Link } from "react-router-dom";

export const Header = () => {
  const auth = useSelector((state) => state.auth.isSignIn);

  return (
    <header className="header">
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
      {auth ? (<Link to="signin" className="header__nav">
        げすとさま ログイン
      </Link>):(<Link to="signin" className="header__nav">
        ログイン
      </Link>)}
      
    </header>
  );
};
