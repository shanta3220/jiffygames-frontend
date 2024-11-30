import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { getUser, updateUser } from "../../scripts/GameApi";
import defaultImage from "../../assets/images/user-profile.png";
import EditUserInput from "../../components/EditUserInput/EditUserInput";
import "./EditUserPage.scss";

function EditUserPage() {
  const isLoggedIn = true;
  const navigate = useNavigate("");
  const userId = 1;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  const imageInputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [avatarPreviewImage, setAvatarPreviewImage] = useState(defaultImage);

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

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUser(userId);
        if (data) {
          setFormData({
            [fieldNames.name]: data.user_name ?? "",
            [fieldNames.email]: data.email ?? "",
            [fieldNames.password]: data.password,
            [fieldNames.confirmPassword]: data.password,
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
  const handleSubmit = (e) => {
    e.preventDefault();
    let hasAnyErrors = "";
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    checkErrors(name, value);
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];

    if (imageFile) {
      setImageFile(imageFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreviewImage(reader.result); // Set the preview image
      };
      reader.readAsDataURL(imageFile);
    }
  };

  const handleImageClick = (e) => {
    e.stopPropagation(); //prevent double opening of the file browse window
    imageInputRef.current.click();
  };

  return (
    <main className="main-edit-user">
      <h1 className="main-edit-user__title">User Profile</h1>
      <form onSubmit={handleSubmit} className="form">
        <section className="form__section-left">
          <img src={avatarPreviewImage} alt="User Avatar." />
          <button className="button" type="button" onClick={handleImageClick}>
            Change Icon
          </button>
          <input
            ref={imageInputRef}
            type="file"
            className="upload-form__image-input"
            name="imageUpload"
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </section>
        <section className="form__section-right">
          <EditUserInput
            inputType="textarea"
            label="About me"
            name={fieldNames.aboutMe}
            handleInputChange={handleInputChange}
            value={formData[fieldNames.aboutMe]}
            errorMessage={errorMessages[fieldNames.aboutMe]}
          />
          <EditUserInput
            inputType="text"
            label="Enter your username"
            name={fieldNames.name}
            handleInputChange={handleInputChange}
            value={formData[fieldNames.name]}
            errorMessage={errorMessages[fieldNames.name]}
          />
          <EditUserInput
            inputType="email"
            label="Email"
            name={fieldNames.email}
            handleInputChange={handleInputChange}
            value={formData[fieldNames.email]}
            errorMessage={errorMessages[fieldNames.email]}
          />
          <EditUserInput
            inputType="password"
            label="Password"
            name={fieldNames.password}
            handleInputChange={handleInputChange}
            value={formData[fieldNames.password]}
            errorMessage={errorMessages[fieldNames.password]}
          />
          {formData[fieldNames.password] !==
            formData[fieldNames.confirmPassword] && (
            <EditUserInput
              inputType="password"
              label="Confirm password"
              name={fieldNames.confirmPassword}
              handleInputChange={handleInputChange}
              value={formData[fieldNames.confirmPassword]}
              errorMessage={errorMessages[fieldNames.confirmPassword]}
            />
          )}
          <button type="submit" className="button">
            Submit
          </button>
        </section>
      </form>
    </main>
  );
}

export default EditUserPage;
