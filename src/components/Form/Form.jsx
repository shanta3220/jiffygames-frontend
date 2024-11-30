import React from "react";
import { Link } from "react-router-dom";
import Input from "../Input/Input";
import "./Form.scss";

function Form({ formData, handleSubmit, handleInputChange, fieldNames }) {
  const isLogin = window.location.pathname.includes("/login");
  if (isLogin) {
    return (
      <section className="form-holder">
        <h1 className="form-title">Login</h1>
        <form onSubmit={handleSubmit} className="form">
          <Input
            inputType="text"
            label="Enter your username"
            name={fieldNames.name}
            handleInputChange={handleInputChange}
            formData={formData}
          />
          <Input
            inputType="password"
            label="Enter your password"
            name={fieldNames.password}
            handleInputChange={handleInputChange}
            formData={formData}
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
        <form onSubmit={handleSubmit} className="form">
          <Input
            inputType="text"
            label="Enter your username"
            name={fieldNames.name}
            handleInputChange={handleInputChange}
            formData={formData}
          />

          <Input
            inputType="email"
            label="Enter your email"
            name={fieldNames.email}
            handleInputChange={handleInputChange}
            formData={formData}
          />
          <Input
            inputType="email"
            label="Enter your email"
            name={fieldNames.confirmEmail}
            handleInputChange={handleInputChange}
            formData={formData}
          />
          <Input
            inputType="password"
            label="Enter your password"
            name={fieldNames.password}
            handleInputChange={handleInputChange}
            formData={formData}
          />
          <Input
            inputType="password"
            label="Enter your confirm password"
            name={fieldNames.confirmPassword}
            handleInputChange={handleInputChange}
            formData={formData}
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
