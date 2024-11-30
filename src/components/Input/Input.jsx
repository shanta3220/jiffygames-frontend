import React from "react";
import errorIcon from "../../assets/icons/error-24px.svg";

function Input({
  value,
  inputType,
  label,
  name,
  handleInputChange,
  errorMessage,
}) {
  return (
    <div className="form__label-and-input">
      <label className="form__input-label">
        {label}
        <input
          type={inputType}
          name={name}
          id={name}
          onChange={handleInputChange}
          value={value}
          placeholder={`${label}...`}
          required
          className="form__input"
        />
        {errorMessage && (
          <div className="form__input-error-message">
            <img src={errorIcon} /> <p>{errorMessage}</p>
          </div>
        )}{" "}
      </label>
    </div>
  );
}

export default Input;
