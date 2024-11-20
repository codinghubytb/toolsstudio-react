import React from "react";
import PropTypes from "prop-types";
import "./SelectInputComponent.css";

const SelectInput = ({
  value,
  onValueChanged,
  textColor = "#000",
  fontSize = 18,
  backgroundColor = "transparent",
  width = 100,
  children
}) => {
  const handleChange = (e) => {
    const newValue = e.target.value;
    onValueChanged(newValue); // Notifie le parent
  };

  return (
    <div
      className="ch-text-select"
      style={{ width: `${Math.min(Math.max(width, 0), 100)}%` }}
    >
      <select
        value={value} // Liaison directe avec la prop
        onChange={handleChange}
        className="ch-select"
        style={{
          color: textColor,
          backgroundColor: backgroundColor,
          fontSize: `${fontSize}px`,
        }}
      >
        {children}
      </select>
    </div>
  );
};

// Define PropTypes for type checking
SelectInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onValueChanged: PropTypes.func.isRequired,
  textColor: PropTypes.string,
  fontSize: PropTypes.number,
  backgroundColor: PropTypes.string,
  width: PropTypes.number,
  children: PropTypes.node.isRequired,
};

export default SelectInput;
