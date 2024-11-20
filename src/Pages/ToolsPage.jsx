import React, { useState, useEffect } from "react";
import GridComponent from "../Library/GridComponent";
import CardComponent from "../Library/CardComponent";
import TitleComponent from "../Library/TitleComponent";
import SpacerComponent from "../Library/SpacerComponent";
import { useModules } from '../ModuleContext/ModuleProvider';
import "./Page.css";

const ToolsPage = ({ category }) => {
  const { modules } = useModules();  // Récupérer les modules depuis le contexte
  const filteredModules = modules.filter(module => module.ModuleCategory === category);  // Filtrer par catégorie

  const renderItemTemplate = (item) => (
    <CardComponent
      key={item._id}
      title={item.Title}
      subTitle="Codinghub Studio"
      icon={item.Icon}
      backgroundColor="#ffffff"
      textColor="#000"
      indication="New"
      textColorIndicator="var(--primary-color)"
      borderColorIndicator="var(--primary-color)"
      backgroundColorIndicator="transparent"
      itemTemplate={<><SpacerComponent/><p>{item.Description}</p></>}
    />
  );
  
  return (
    <div className="tools-page">
      <h1>Outils : {category}</h1>
    
      <GridComponent
      items={filteredModules}
      itemTemplate={renderItemTemplate}
      columnsXXL={3}
      columnsXL={2}
      columnsLG={2}
      columnsMD={1}
      columnsSM={1}
      gap={50}
    />
    </div>
  );
};

export default ToolsPage;
