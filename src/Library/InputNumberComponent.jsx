import React, { useState } from "react";
import PropTypes from "prop-types";
import "./InputNumberComponent.css";

const InputNumberComponent = ({
  value,
  onValueChange,
  min,
  max,
  placeholder,
  textColor = "#000",
  disabled = false,
  additionalAttributes = {},
  updateOnInput = false
}) => {
  const [inputValue, setInputValue] = useState(value);

  // Handle input change
  const handleInput = (e) => {
    const newValue = e.target.value;

    // Validate numeric input
    if (newValue === "" || (!isNaN(newValue) && newValue >= min && newValue <= max)) {
      setInputValue(newValue);
      if (updateOnInput) {
        onValueChange(newValue); // Pass the updated value immediately
      }
    }
  };

  // Handle change for deferred updates (on blur or after input completion)
  const handleChange = () => {
    if (!updateOnInput) {
      onValueChange(inputValue); // Pass the final value when the input is done
    }
  };

  return (
    <div className="ch-number-input">
      <input
        type="number"
        value={inputValue}
        onInput={handleInput} // Triggered immediately when value changes
        onChange={handleChange} // Triggered after change when input is done
        placeholder={placeholder}
        disabled={disabled}
        style={{ color: textColor }}
        min={min}
        max={max}
        {...additionalAttributes} // Spread additional attributes
        className="ch-input"
      />
    </div>
  );
};

InputNumberComponent.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onValueChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  placeholder: PropTypes.string,
  textColor: PropTypes.string,
  disabled: PropTypes.bool,
  updateOnInput: PropTypes.bool,
  additionalAttributes: PropTypes.object,
};

InputNumberComponent.defaultProps = {
  min: Number.MIN_SAFE_INTEGER,
  max: Number.MAX_SAFE_INTEGER,
  placeholder: "",
  textColor: "#000",
  disabled: false,
  updateOnInput: true,
  additionalAttributes: {},
};

export default InputNumberComponent;
