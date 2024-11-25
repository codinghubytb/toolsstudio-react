import React, { useState } from "react";
import PropTypes from "prop-types";
import "./InputNumberComponent.css";

const InputNumberComponent = ({
  value,
  onValueChanged,
  min,
  max,
  placeholder,
  textColor = "#000",
  disabled = false,
  additionalAttributes = {}
}) => {

  // Gestion des changements de valeur avec validation numérique
  const handleInputChange = (e) => {
    let newValue = e.target.value;

    // Si la valeur est vide, ne pas la traiter
    if (newValue === "") {
      newValue = null;
    }

    // Assurez-vous que la valeur est un nombre valide
    if (newValue !== null && (isNaN(newValue) || newValue < min || newValue > max)) {
      return; // Ne pas accepter la valeur si elle est invalide ou hors des limites
    }

    if (onValueChanged) {
      onValueChanged(newValue); // Envoie la nouvelle valeur au parent
    }
  };

  return (
    <div className="ch-number-input">
      <input
        type="number"
        value={value || ""}
        onChange={handleInputChange}
        placeholder={placeholder}
        disabled={disabled}
        style={{ color: textColor }}
        min={min}
        max={max}
        {...additionalAttributes} // Spread des attributs supplémentaires
        className="ch-input"
      />
    </div>
  );
};

InputNumberComponent.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onValueChanged: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  placeholder: PropTypes.string,
  textColor: PropTypes.string,
  disabled: PropTypes.bool,
  additionalAttributes: PropTypes.object,
};

export default InputNumberComponent;
