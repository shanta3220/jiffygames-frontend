import { useState } from "react";
import Form from "../../components/Form/Form";

function RegisterPage() {
  const fieldNames = {
    name: "username",
    email: "email",
    confirmEmail: "confirmEmail",
    password: "password",
    confirmPassword: "confirmPassword",
  };

  const [formData, setFormData] = useState({
    [fieldNames.name]: "",
    [fieldNames.email]: "",
    [fieldNames.confirmEmail]: "",
    [fieldNames.password]: "",
    [fieldNames.confirmPassword]: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    console.log(e);
  };

  return (
    <Form
      formData={formData}
      handleInputChange={handleInputChange}
      fieldNames={fieldNames}
    />
  );
}

export default RegisterPage;
