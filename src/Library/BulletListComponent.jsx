import React from "react";
import PropTypes from "prop-types";
import "./BulletListComponent.css";

const BulletListComponent = ({ children }) => {
  return (
    <ul className="ch-checkbox-list">
      {children}
    </ul>
  );
};

BulletListComponent.propTypes = {
  children: PropTypes.node.isRequired, // Les éléments à afficher dans la liste.
};

export default BulletListComponent;
