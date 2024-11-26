import React, { useState } from "react";
import GridComponent from "../Library/GridComponent";
import CardComponent from "../Library/CardComponent";
import LabelComponent from "../Library/LabelComponent";
import InputTextComponent from "../Library/InputTextComponent";
import SpacerComponent from "../Library/SpacerComponent";
import { useModules } from "../ModuleContext/ModuleProvider";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { modules } = useModules();
  const [searchText, setSearchText] = useState("");

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const filteredModules = modules.filter((module) =>
    module.Title.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItemTemplate = (item) => (
    <Link to={item.Path} key={item._id}>
      <CardComponent
        title={item.Title}
        subTitle="Codinghub Studio"
        icon={item.Icon}
        backgroundColor="#ffffff"
        textColor="#000"
        indication="New"
        textColorIndicator="green"
        borderColorIndicator="green"
        backgroundColorIndicator="transparent"
        itemTemplate={
          <>
            <SpacerComponent />
            <p>{item.Description}</p>
          </>
        }
      />
    </Link>
  );

  return (
    <div className="tools-page">
      <SpacerComponent numberSpace={2} />
      <h1 style={{maxWidth: "900px", fontSize:"45px"}}>Des outils adaptés aux services de vos besoins</h1>
      <SpacerComponent numberSpace={2} />
      <p style={{fontSize: 16}}>Tous nos outils sont conçus pour une utilisation optimale et respectueuse de votre confidentialité. <br />
      Aucune image ni donnée n'est stockée sur nos serveurs.</p>
      
      <SpacerComponent numberSpace={2} />

      <InputTextComponent
        value={searchText}
        onValueChanged={handleSearch}
        backgroundColor="white"
        borderColor="var(--primary-color)"
        textColor="#000"
        placeholder="Search Translate Language ..."
      />

      <SpacerComponent numberSpace={2} />
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
      <SpacerComponent numberSpace={2}/>
    </div>
    
  );
};

export default HomePage;
