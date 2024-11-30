import { useRef, useState } from "react";
import errorIcon from "../../assets/icons/error-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";

function UserProfileInput({
  value,
  inputType,
  label,
  name,
  handleInputChange,
  errorMessage,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef();

  const handleEdit2 = () => {
    setIsFocused(true);
    ref.current.focus();
  };

  const handleBlur2 = () => {
    setIsFocused(false);
  };

  return (
    <div className="form__label-and-input">
      <label className="form__input-label">
        {label}
        <div className="form__input-holder">
          <input
            type={inputType}
            name={name}
            id={name}
            onChange={handleInputChange}
            value={value}
            placeholder={`${label}...`}
            required
            className="form__input"
            onBlur={handleBlur2}
            ref={ref}
            disabled={!isFocused}
          />
          {!isFocused && (
            <img src={editIcon} alt="edit icon" onClick={handleEdit2} />
          )}
        </div>
        {errorMessage && (
          <div className="form__input-error-message">
            <img src={errorIcon} /> <p>{errorMessage}</p>
          </div>
        )}{" "}
      </label>
    </div>
  );
}

export default UserProfileInput;
