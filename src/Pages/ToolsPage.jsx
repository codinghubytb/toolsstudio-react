import React, { useState, useEffect } from "react";
import ToolCard from "../Components/ToolCard"; // Import du composant ToolCard
import { useModules } from '../ModuleContext/ModuleProvider';
import "./Page.css";

const ToolsPage = ({ category }) => {
  const { modules } = useModules();  // Récupérer les modules depuis le contexte
  const filteredModules = modules.filter(module => module.ModuleCategory === category);  // Filtrer par catégorie

  // Affichage des modules sous forme de cartes
  return (
    <div className="tools-page">
      <h1>Outils : {category}</h1>
      <div className="cards-container">
        {filteredModules.map((filteredModules) => (
          <ToolCard key={filteredModules._id} module={filteredModules} /> // Utilisation du composant ToolCard
        ))}
      </div>
    </div>
  );
};

export default ToolsPage;
