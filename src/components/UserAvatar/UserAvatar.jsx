import React from "react";
import "./UserAvatar.scss";
import profileIcon from "../../assets/images/user-avatar-example.jpg";
function UserAvatar() {
  return (
    <div className="user-avatar">
      <img src={profileIcon} alt="userProfileIcon" />
    </div>
  );
}

export default UserAvatar;
