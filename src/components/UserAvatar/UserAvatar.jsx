import "./UserAvatar.scss";
import defaultIcon from "../../assets/images/user-profile.png";
import { Link } from "react-router-dom";
import { getUser, isGuestUser } from "../../scripts/game-api";
import { useState, useEffect } from "react";

function UserAvatar({ linkPath, avatar, userId }) {
  const [avatarPath, setAvatarPath] = useState(defaultIcon);
  useEffect(() => {
    if (!avatar && userId) {
      const fetchUser = async () => {
        try {
          const data = await getUser(userId);

          if (data && data.avatar_path) {
            setAvatarPath(data.avatar_path);
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchUser();
    } else {
      setAvatarPath(avatar);
    }
  }, [userId, avatar]);
  return !isGuestUser(userId) ? (
    <Link to={linkPath ?? "/user-profile"} className="user-avatar">
      <div className="user-avatar__image-container">
        <img src={avatarPath} alt="userProfileIcon" />
      </div>
    </Link>
  ) : (
    <div className="user-avatar__image-container user-avatar__image-container--guest">
      <img src={avatarPath} alt="userProfileIcon" />
    </div>
  );
}

export default UserAvatar;
