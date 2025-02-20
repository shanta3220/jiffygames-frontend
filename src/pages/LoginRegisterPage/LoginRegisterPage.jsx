import { useState } from "react";
import Form from "../../components/Form/Form";
import { useNavigate } from "react-router-dom";
import { login, postUser, guestUserName } from "../../scripts/game-api";

function LoginRegisterPage() {
  const fieldNames = {
    name: "username",
    email: "email",
    confirmEmail: "confirmEmail",
    password: "password",
    confirmPassword: "confirmPassword",
  };

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    [fieldNames.name]: "",
    [fieldNames.email]: "",
    [fieldNames.confirmEmail]: "",
    [fieldNames.password]: "",
    [fieldNames.confirmPassword]: "",
  });

  const [errorMessages, setErrorMessages] = useState({
    [fieldNames.name]: "",
    [fieldNames.email]: "",
    [fieldNames.confirmEmail]: "",
    [fieldNames.password]: "",
    [fieldNames.confirmPassword]: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasAnyErrors = "";

    const isLogin = window.location.pathname.includes("/login");

    if (isLogin) {
      hasAnyErrors =
        checkErrors(fieldNames.name, formData[fieldNames.name]) ||
        checkErrors(fieldNames.password, formData[fieldNames.password]);
    } else {
      for (let key of Object.keys(formData)) {
        hasAnyErrors = checkErrors(key, formData[key]);
        if (hasAnyErrors) {
          break;
        }
      }
    }

    if (hasAnyErrors) {
      return;
    }
    if (isLogin) {
      const handleLogin = async () => {
        const user = await login(
          formData[fieldNames.name],
          formData[fieldNames.password]
        );
        if (user) {
          navigate("/");
          alert("sucessfully logged in");
        } else {
          setErrorMessages((prevErrors) => ({
            ...prevErrors,
            [fieldNames.name]: "username and password is not matching",
            [fieldNames.password]: "username password is not matching",
          }));
        }
      };

      handleLogin();
      return;
    }
    const userObject = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    const addUserToApi = async () => {
      try {
        const data = await postUser(userObject);

        alert(`Succesfully added ${data.username}`);
        navigate("/");
      } catch (e) {
        alert(`username or email already exists`);
      }
    };

    addUserToApi();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    checkErrors(name, value);
  };

  const handleLogin = async () => {
    const user = await login(
      formData[fieldNames.name],
      formData[fieldNames.password]
    );
    if (user) {
      navigate("/");
      alert("sucessfully logged in");
    } else {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [fieldNames.name]: "user/ password is not matching",
        [fieldNames.password]: "user/ password is not matching",
      }));
    }
  };

  // check errors by field/inputName and value
  const checkErrors = (inputName, value) => {
    let errorText = "";
    switch (inputName) {
      case fieldNames.name:
        errorText =
          value.trim() === ""
            ? "Name cannot be empty or have whitespace"
            : value.toLowerCase() === guestUserName.toLowerCase()
            ? `Username cannot be ${guestUserName}`
            : "";
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
      case fieldNames.confirmEmail:
        errorText =
          value.trim() === ""
            ? "Confirm email cannot be empty or have whitespace"
            : value !== formData[fieldNames.email]
            ? "Confirm email does not match with email"
            : "";
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

  return (
    <Form
      fieldNames={fieldNames}
      formData={formData}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      errorMessages={errorMessages}
    />
  );
}

export default LoginRegisterPage;
