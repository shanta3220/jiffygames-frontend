import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUser } from "../../scripts/GameApi";
import UserProfileInput from "../../components/UserProfileInput/UserProfileInput";
import "./UserProfilePage.scss";
import UserAvatar from "../../components/UserAvatar/UserAvatar";

function UserProfilePage() {
  const { userId } = useParams();

  const fieldNames = {
    avatar: "avatar",
    name: "username",
    aboutMe: "aboutMe",
  };

  const [formData, setFormData] = useState({
    [fieldNames.name]: "",
    [fieldNames.avatar]: "",
    [fieldNames.aboutMe]: "",
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUser(userId);

        if (data) {
          setFormData({
            [fieldNames.name]: data.user_name ?? "",
            [fieldNames.avatar]: data.avatar ?? "",
            [fieldNames.aboutMe]: data.about_me ?? "",
          });
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchUserInfo();
  }, [userId]);

  return (
    <main className="main-user-profile">
      <h1 className="main-user-profile__title">User Profile</h1>
      <form className="form">
        <section className="form__section-left">
          <UserAvatar
            avatar={fieldNames.avatar}
            linkPath={`/users/${userId}`}
          />
        </section>
        <section className="form__section-right">
          <UserProfileInput
            inputType="text"
            label="Username"
            name={fieldNames.name}
            value={formData[fieldNames.name]}
          />
          <UserProfileInput
            inputType="textarea"
            label="About me"
            name={fieldNames.aboutMe}
            value={formData[fieldNames.aboutMe]}
          />
        </section>
      </form>
    </main>
  );
}

export default UserProfilePage;
