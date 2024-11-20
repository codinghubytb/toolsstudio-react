import React from 'react';
import PropTypes from 'prop-types';
import './TagComponent.css'; // Importez le fichier CSS pour le style

const TagComponent = ({
  element,
  backgroundColor = '#f1eeff', // Valeur par défaut
  textColor = '#6558d3',        // Valeur par défaut
  borderColor = ''             // Valeur par défaut
}) => {
  const tagStyle = {
    backgroundColor: backgroundColor,
    color: textColor,
    border: borderColor ? `1px solid ${borderColor}` : '', // Ajouter la bordure uniquement si elle existe
  };

  return (
    <span className="tag" style={tagStyle}>
      {element}
    </span>
  );
};

TagComponent.propTypes = {
  element: PropTypes.node.isRequired, // Le contenu à afficher dans le tag
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  borderColor: PropTypes.string,
};

export default TagComponent;
