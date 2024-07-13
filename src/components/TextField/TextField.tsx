import { useState, useEffect, FC, ChangeEvent } from "react";
import "./TextField.scss";

interface TextFieldProps {
  type?: string;
  name?: string;
  label?: string;
  error?: boolean;
  errorMsg?: string;
  modelValue?: string;
  autocomplete?: string;
  onUpdateModelValue: (value: string) => void;
}

const TextField: FC<TextFieldProps> = ({
  type = "text",
  name = "",
  label = "",
  error = false,
  errorMsg = "",
  modelValue = "",
  autocomplete = "off",
  onUpdateModelValue,
}) => {
  const [focussed, setFocussed] = useState(false);
  const [value, setValue] = useState(modelValue);

  useEffect(() => {
    setValue(modelValue);
  }, [modelValue]);

  const inputText = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onUpdateModelValue(e.target.value);
  };

  const handleIconClick = () => {
    setValue("");
    onUpdateModelValue("");
  };

  const handleFocus = () => setFocussed(true);
  const handleBlur = () => setFocussed(false);

  return (
    <label
      className={`field ${!value ? "empty" : ""} ${error ? "error" : ""} ${
        focussed ? "focussed" : ""
      }`}
    >
      {label && <span className="label">{label}</span>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={inputText}
        autoComplete={autocomplete}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <span className="icon material-symbols-rounded" onClick={handleIconClick}>
        {error ? "error" : "cancel"}
      </span>
      {errorMsg && <span className="error-message">{errorMsg}</span>}
    </label>
  );
};

export default TextField;
