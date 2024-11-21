import React from "react";
import PropTypes from "prop-types";
import "./InputCheckboxComponent.css";

const InputCheckboxComponent = ({
  value,
  onValueChanged,
  label = "",
  id,
  textColor = "#000",
  stopPropagation = false,
}) => {
  const handleClick = (e) => {
    if (stopPropagation) {
      e.stopPropagation();
    }
  };

  const handleChange = (e) => {
    onValueChanged(e.target.checked);
  };

  return (
    <div
      className="checkbox-input"
      style={{ display: "flex", alignItems: "center" }}
      onClick={handleClick}
    >
      <input
        type="checkbox"
        className="ch-checkbox-input"
        checked={value}
        id={id}
        onChange={handleChange}
      />
      {label && (
        <label
          htmlFor={id}
          className="ch-checkbox-label"
          style={{ color: textColor }}
        >
          {label}
        </label>
      )}
    </div>
  );
};

InputCheckboxComponent.propTypes = {
  value: PropTypes.bool.isRequired, // État de la case à cocher (coché ou non).
  onValueChanged: PropTypes.func.isRequired, // Fonction de callback pour gérer le changement de valeur.
  label: PropTypes.string, // Texte du label associé.
  textColor: PropTypes.string, // Couleur du texte du label.
  id: PropTypes.string, // ID unique pour l'élément checkbox.
  stopPropagation: PropTypes.bool, // Empêche la propagation des clics si vrai.
};

export default InputCheckboxComponent;
