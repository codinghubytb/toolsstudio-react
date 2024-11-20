import React, { useState, useEffect } from "react";
import ToolCard from "../Components/ToolCard"; // Import du composant ToolCard
import { useModules } from '../ModuleContext/ModuleProvider';


const HomePage = () => {
    const { modules } = useModules();
  
    // Affichage des modules sous forme de cartes
    return (
      <div className="tools-page">
        <h1>Bienvenue</h1>
        <p>{modules.length} modules</p>
        <div className="cards-container">
          {modules.map((modules) => (
            <ToolCard key={modules._id} module={modules} /> // Utilisation du composant ToolCard
          ))}
        </div>
      </div>
    );
  };
  
  export default HomePage;
  