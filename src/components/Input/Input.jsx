import React from "react";

function Input({ formData, inputType, label, name, handleInputChange }) {
  return (
    <div className="form__label-and-input">
      <label className="form__input-label">
        {label}
        <input
          type={inputType}
          name={name}
          id={name}
          onChange={handleInputChange}
          value={formData[name]}
          placeholder={`${label}...`}
          required
          className="form__input"
        />
      </label>
    </div>
  );
}

export default Input;
