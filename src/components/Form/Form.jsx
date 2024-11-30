import React from "react";
import Input from "../Input/Input";

function Form({ formData, handleSubmit, handleInputChange, fieldNames }) {
  const isLogin = window.location.pathname.includes("/login");
  if (isLogin) {
    return (
      <form onSubmit={handleSubmit} className="form">
        <Input
          inputType="text"
          label="Enter your username"
          name={fieldNames.name}
          handleInputChange={handleInputChange}
          className="form-input"
          formData={formData}
        />
        <Input
          inputType="password"
          label="Enter your password"
          name={fieldNames.password}
          handleInputChange={handleInputChange}
          className="form-input"
          formData={formData}
        />{" "}
      </form>
    );
  } else {
    return (
      <form onSubmit={handleSubmit} className="form">
        <Input
          inputType="text"
          label="Enter your username"
          name={fieldNames.name}
          handleInputChange={handleInputChange}
          className="form-input"
          formData={formData}
        />

        <Input
          inputType="email"
          label="Enter your email"
          name={fieldNames.email}
          handleInputChange={handleInputChange}
          className="form-input"
          formData={formData}
        />
        <Input
          inputType="email"
          label="Enter your email"
          name={fieldNames.confirmEmail}
          handleInputChange={handleInputChange}
          className="form-input"
          formData={formData}
        />
        <Input
          inputType="password"
          label="Enter your password"
          name={fieldNames.password}
          handleInputChange={handleInputChange}
          className="form-input"
          formData={formData}
        />
        <Input
          inputType="password"
          label="Enter your confirm password"
          name={fieldNames.confirmPassword}
          handleInputChange={handleInputChange}
          className="form-input"
          formData={formData}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default Form;
