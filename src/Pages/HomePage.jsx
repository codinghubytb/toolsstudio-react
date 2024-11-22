import React, { useState } from "react";
import GridComponent from "../Library/GridComponent";
import CardComponent from "../Library/CardComponent";
import TitleComponent from "../Library/TitleComponent";
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
      <h1>Bienvenue ({filteredModules.length})</h1>
      <SpacerComponent numberSpace={2} />

      <InputTextComponent
        value={searchText}
        onValueChanged={handleSearch}
        backgroundColor="white"
        borderColor="var(--primary-color)"
        textColor="#000"
        placeholder="Search module..."
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
    </div>
  );
};

export default HomePage;
