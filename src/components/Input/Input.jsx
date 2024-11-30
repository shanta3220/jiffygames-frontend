import React from "react";

function Input({ formData, inputType, label, name, handleInputChange }) {
  return (
    <label>
      {label}
      <input
        type={inputType}
        name={name}
        id={name}
        onChange={handleInputChange}
        value={formData[name]}
        placeholder={`${label}...`}
        required
      />
    </label>
  );
}

export default Input;
