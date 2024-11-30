import { useRef, useState } from "react";
import errorIcon from "../../assets/icons/icon_error.svg";
import editIcon from "../../assets/icons/icon_edit.png";

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

  const handleEdit = () => {
    setIsFocused(true);
    ref.current.focus();
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="form__label-and-input">
      <label className="form__input-label">
        {label}
        <div className="form__input-holder">
          {inputType !== "textarea" ? (
            <input
              type={inputType}
              name={name}
              id={name}
              onChange={handleInputChange}
              value={value}
              placeholder={`${label}...`}
              required
              className="form__input"
              onBlur={handleBlur}
              ref={ref}
              disabled={!isFocused}
            />
          ) : (
            <textarea
              name={name}
              id={name}
              onChange={handleInputChange}
              value={value}
              placeholder={`${label}...`}
              className="form__input--textarea"
              onBlur={handleBlur}
              ref={ref}
              disabled={!isFocused}
            />
          )}
          {!isFocused && (
            <img src={editIcon} alt="edit icon" onClick={handleEdit} />
          )}
        </div>
        {errorMessage && (
          <div className="form__input-error-message">
            <img src={errorIcon} alt="error icon" /> <p>{errorMessage}</p>
          </div>
        )}
      </label>
    </div>
  );
}

export default UserProfileInput;
