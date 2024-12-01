import "./Header.scss";
import { NavLink, useNavigate } from "react-router-dom";
import logoIcon from "/logo.png";
import UserAvatar from "../UserAvatar/UserAvatar";
import { getMyUserId, Logout } from "../../scripts/GameApi";

function Header() {
  const navigate = useNavigate();
  const userId = getMyUserId();

  const handleLogout = () => {
    Logout();
    navigate("/");
  };

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
        {!userId && (
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
        {userId && (
          <>
            <span onClick={handleLogout} className="header__link">
              LOGOUT
            </span>
            <UserAvatar />
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
