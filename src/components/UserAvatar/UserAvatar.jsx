import React from "react";
import "./UserAvatar.scss";
import profileIcon from "../../assets/images/user-avatar-example.jpg";
import defaultIcon from "../../assets/images/user-profile.png";
import { Link } from "react-router-dom";

function UserAvatar({ linkPath, avatar }) {
  return (
    <Link to={linkPath ?? "/user-profile"} className="user-avatar">
      <div className="user-avatar__image-container">
        <img src={avatar ?? defaultIcon} alt="userProfileIcon" />
      </div>
    </Link>
  );
}

export default UserAvatar;
