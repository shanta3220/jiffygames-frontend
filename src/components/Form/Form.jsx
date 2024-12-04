import React from "react";
import { Link } from "react-router-dom";
import Input from "../Input/Input";
import "./Form.scss";

function Form({
  fieldNames,
  formData,
  handleSubmit,
  handleInputChange,
  errorMessages,
}) {
  const isLogin = window.location.pathname.includes("/login");
  if (isLogin) {
    return (
      <section className="form-holder">
        <h1 className="form-title">Login</h1>
        <form onSubmit={handleSubmit} className="form" autoComplete="off">
          <Input
            inputType="text"
            label="Enter your username"
            name={fieldNames.name}
            handleInputChange={handleInputChange}
            value={formData[fieldNames.name]}
            errorMessage={errorMessages[fieldNames.name]}
          />
          <Input
            inputType="password"
            label="Enter your password"
            name={fieldNames.password}
            handleInputChange={handleInputChange}
            value={formData[fieldNames.password]}
            errorMessage={errorMessages[fieldNames.password]}
          />
          <button type="submit" className="button">
            LOGIN
          </button>
        </form>
      </section>
    );
  } else {
    return (
      <section className="form-holder">
        <h1 className="form-title">Sign Up</h1>
        <form onSubmit={handleSubmit} className="form" autoComplete="off">
          <Input
            inputType="text"
            label="Enter your username"
            name={fieldNames.name}
            handleInputChange={handleInputChange}
            value={formData[fieldNames.name]}
            errorMessage={errorMessages[fieldNames.name]}
          />

          <Input
            inputType="email"
            label="Enter your email"
            name={fieldNames.email}
            handleInputChange={handleInputChange}
            value={formData[fieldNames.email]}
            errorMessage={errorMessages[fieldNames.email]}
          />
          <Input
            inputType="email"
            label="Enter your confirm email"
            name={fieldNames.confirmEmail}
            handleInputChange={handleInputChange}
            value={formData[fieldNames.confirmEmail]}
            errorMessage={errorMessages[fieldNames.confirmEmail]}
          />
          <Input
            inputType="password"
            label="Enter your password"
            name={fieldNames.password}
            handleInputChange={handleInputChange}
            value={formData[fieldNames.password]}
            errorMessage={errorMessages[fieldNames.password]}
          />
          <Input
            inputType="password"
            label="Enter your confirm password"
            name={fieldNames.confirmPassword}
            handleInputChange={handleInputChange}
            value={formData[fieldNames.confirmPassword]}
            errorMessage={errorMessages[fieldNames.confirmPassword]}
          />
          <div className="form__button-and-link">
            <Link className="form__account-link" to={"/login"}>
              <p className="form__account-link">
                Already have an account? Login
              </p>
            </Link>
            <button type="submit" className="button">
              Sign Up
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default Form;
