import React from "react";
import { Link } from 'react-router-dom'; // Import du composant Link
import "./ToolCard.css";
import TagComponent from "../Library/TagComponent";

const ToolCard = ({ module }) => {

  return (
    <Link to={`/${module.Path}`}>
      <div className="card">
      <TagComponent
            element="New"
            backgroundColor="transparent"
            textColor="var(--primary-color)"
            borderColor="var(--primary-color)"
          />
        <img src={module.Icon} alt={module.Title} className="card-image" />
        <h3>{module.Title}</h3>
        <p>{module.Description}</p>
        <span>{module.DateCreated}</span>
        {/* Ajoute d'autres propriétés si nécessaires */}
      </div>
    </Link>
  );
};

export default ToolCard;
