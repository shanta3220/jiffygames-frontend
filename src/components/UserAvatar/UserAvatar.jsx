import React from "react";
import "./UserAvatar.scss";
import profileIcon from "../../assets/images/user-avatar-example.jpg";
import { Link } from "react-router-dom";

function UserAvatar({ linkPath }) {
  return (
    <Link to={linkPath ?? "/user-profile"} className="user-avatar">
      <div className="user-avatar__image-container">
        <img src={profileIcon} alt="userProfileIcon" />
      </div>
    </Link>
  );
}

export default UserAvatar;
