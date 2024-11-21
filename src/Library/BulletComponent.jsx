import React from "react";
import PropTypes from "prop-types";
import "./BulletComponent.css";

const BulletComponent = ({ children }) => {
  return (
    <li className="ch-bullet">
      {children}
    </li>
  );
};

BulletComponent.propTypes = {
  children: PropTypes.node.isRequired, // Contenu à afficher dans le bullet.
};

export default BulletComponent;
