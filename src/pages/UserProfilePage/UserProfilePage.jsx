import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { updateUser } from "../../scripts/GameApi";
import { defaultImage } from "../../assets/images/user-profile.png";

function UserProfile() {
  const isLoggedIn = true;
  const navigate = useNavigate("");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  const imageInputRef = useRef(null);
  const usernameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);
  const aboutMeInputRef = useRef(null);

  const [imageFile, setImageFile] = useState(null);
  const [videoPreviewImage, setVideoPreviewImage] = useState(defaultImage);

  const fieldNames = {
    avatar: "avatar",
    name: "username",
    email: "email",
    password: "password",
    confirmPassword: "confirmPassword",
    aboutMe: "aboutMe",
  };

  const [formData, setFormData] = useState({
    [fieldNames.name]: "",
    [fieldNames.email]: "",
    [fieldNames.password]: "",
    [fieldNames.confirmPassword]: "",
    [fieldNames.avatar]: "",
    [fieldNames.aboutMe]: "",
  });

  const [errorMessages, setErrorMessages] = useState({
    [fieldNames.name]: "",
    [fieldNames.email]: "",
    [fieldNames.password]: "",
    [fieldNames.confirmPassword]: "",
    [fieldNames.aboutMe]: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasAnyErrors = "";

    const isLogin = window.location.pathname.includes("/login");

    for (let key of Object.keys(formData)) {
      hasAnyErrors = checkErrors(key, formData[key]);
      if (hasAnyErrors) {
        break;
      }
    }

    if (hasAnyErrors) {
      return;
    }

    const updateUser = async () => {
      try {
        const userObject = {
          user_name: formData.name,
          email: formData.email,
          password: formData.password,
          avatar: imageFile,
          about_me: formData.about_me,
        };
        const updatedUser = await updateUser(userObject);
        if (updatedUser) {
          alert("User info has been successfully updated!");
          navigate("/");
        }
      } catch (error) {
        console.error("updateUser:", error);
        navigate("/");
      }
    };

    updateUser();
  };

  const checkErrors = (inputName, value) => {
    let errorText = "";
    switch (inputName) {
      case fieldNames.name:
        errorText =
          value.trim() === "" ? "Name cannot be empty or have whitespace" : "";
        break;
      case fieldNames.password:
        errorText =
          value.trim() === ""
            ? "Password cannot be empty or have whitespace"
            : "";
        break;
      case fieldNames.confirmPassword:
        errorText =
          value.trim() === ""
            ? "Confirm Password cannot be empty or have whitespace"
            : value !== formData[fieldNames.password]
            ? "Confirm Password does not match with password"
            : "";
        break;
      case fieldNames.email:
        errorText =
          value.trim() === "" ? "Email cannot be empty or have whitespace" : "";
        if (!errorText) {
          const isEmailValid =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g.test(value);
          if (!isEmailValid) {
            errorText = "Please insert a valid email, ie: johndoe@abcd.com";
          }
        }
        break;
      default:
        break;
    }

    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      [inputName]: errorText,
    }));

    return errorText;
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];

    if (imageFile) {
      setImageFile(imageFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoPreviewImage(reader.result); // Set the preview image
      };
      reader.readAsDataURL(imageFile);
    }
  };

  const handleImageClick = (e) => {
    e.stopPropagation(); //prevent double opening of the file browse window
    imageInputRef.current.click();
  };

  const handleUsernameClick = (e) => {
    e.stopPropagation();
    usernameInputRef.current.click();
  };

  const handleAboutmeClick = (e) => {
    e.stopPropagation();
    aboutMeInputRef.current.click();
  };

  const handleEmailClick = (e) => {
    e.stopPropagation();
    emailInputRef.current.click();
  };

  const handlePasswordClick = (e) => {
    e.stopPropagation();
    passwordInputRef.current.click();
  };

  const handleConfirmPasswordClick = (e) => {
    e.stopPropagation();
    confirmPasswordInputRef.current.click();
  };

  return (
    <main className="upload-content">
      <h1 className="upload-content__title">Upload Video</h1>
      <form onSubmit={handleSubmit} className="upload-form">
        <label className="upload-form__label--video-thumnail">
          Video Thumbnail
          <div className="upload-form__image-container">
            <img
              src={videoPreviewImage}
              alt="Thumbnail image showcasing your video's visual style."
              onClick={() => handleImageClick}
            />
          </div>
          <input
            ref={imageInputRef}
            type="file"
            className="upload-form__image-input"
            name="imageUpload"
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
          />
        </label>
      </form>
    </main>
  );
}

export default UserProfile;
