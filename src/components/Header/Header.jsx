import "./Header.scss";
import { Link, NavLink } from "react-router-dom";
import logoIcon from "/logo.png";

function Header() {
  const isLoggedIn = false;

  return (
    <div className="header">
      <div className="header__logo">
        <img
          src={logoIcon}
          alt="JiffyGames logo"
          className="header__logo-icon"
        />
        <p className="header__logo-title">
          JIFFY<span className="header__logo-title--Games">GAMES</span>
        </p>
      </div>
      <div className="header__links">
        <NavLink to={"/"} className="header__link">
          HOME
        </NavLink>
        <NavLink to={"/games"} className="header__link">
          GAMES
        </NavLink>
        <NavLink to={"/leaderboards"} className="header__link">
          LEADERBOARDS
        </NavLink>
      </div>
      <div className="header__links">
        {!isLoggedIn && (
          <NavLink
            to={"/register"}
            className={({ isActive }) =>
              `header__link ${
                window.location.pathname.includes("/login") || isActive
                  ? "active"
                  : ""
              }`
            }
          >
            LOGIN/SIGN UP
          </NavLink>
        )}
        {isLoggedIn && (
          <>
            <Link to={"/"} className="header__link">
              LOGOUT
            </Link>{" "}
            <Link to={"/user-profile"} className="header__user-profile">
              <img
                src={"../../assets/images/user-profile.png"}
                alt="User Avatar"
                className="user-avatar"
              />
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
