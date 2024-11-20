import React from "react";
import PropTypes from "prop-types";
import "./InputTextareaComponent.css";

const InputTextareaComponent = ({
  value,
  onValueChanged,
  id = "",
  row = 10,
  col = 50,
  placeholder = "",
  textColor = "#000",
  backgroundColor = "transparent",
  borderColor = "transparent",
  fontSize = "18px",
  maxlength = 1000,
  width = "100%",
  disabled = false
}) => {
  const handleChange = (e) => {
    const newValue = e.target.value;
    onValueChanged(newValue);
  };

  return (
    <div
      className="ch-textarea-input"
      style={{ width: width, borderColor: borderColor }}
    >
      <textarea
        id={id}
        value={value} // Directly bind the value prop
        onChange={handleChange} // Notify parent on change
        placeholder={placeholder}
        rows={row}
        cols={col}
        maxLength={maxlength}
        disabled={disabled}
        style={{
          color: textColor,
          backgroundColor: backgroundColor,
          fontSize: fontSize
        }}
        className="ch-textarea"
      />
    </div>
  );
};

InputTextareaComponent.propTypes = {
  value: PropTypes.string.isRequired,
  id: PropTypes.string,
  row: PropTypes.number,
  col: PropTypes.number,
  placeholder: PropTypes.string,
  textColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
  fontSize: PropTypes.string,
  maxlength: PropTypes.number,
  width: PropTypes.string,
  disabled: PropTypes.bool
};

export default InputTextareaComponent;
