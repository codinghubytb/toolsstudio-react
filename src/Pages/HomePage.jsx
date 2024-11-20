import React, { useState, useEffect } from "react";
import GridComponent from "../Library/GridComponent";
import CardComponent from "../Library/CardComponent";
import TitleComponent from "../Library/TitleComponent";
import SpacerComponent from "../Library/SpacerComponent";
import { useModules } from '../ModuleContext/ModuleProvider';


const HomePage = () => {
    const { modules } = useModules();
  
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
         <SpacerComponent />
        <h1>Bienvenue ({modules.length})</h1>
        <SpacerComponent numberSpace={2}/>
        <GridComponent
        items={modules}
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
  
  export default HomePage;
  