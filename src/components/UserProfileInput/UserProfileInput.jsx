function UserProfileInput({ value, inputType, label, name }) {
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
              value={value}
              required
              className="form__input"
              disabled
            />
          ) : (
            <textarea
              name={name}
              id={name}
              value={value}
              className="form__input--textarea"
              disabled
            />
          )}
        </div>
      </label>
    </div>
  );
}

export default UserProfileInput;
