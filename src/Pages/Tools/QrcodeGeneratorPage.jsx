import React, { useState } from "react";

import PositionedComponent from "../../Library/PositionedComponent";
import WrapperComponent from "../../Library/WrapperComponent";
import ButtonComponent from "../../Library/ButtonComponent";
import TitleComponent from "../../Library/TitleComponent";
import SpacerComponent from "../../Library/SpacerComponent";
import InputTextComponent from "../../Library/InputTextComponent";

const QrcodeGeneratorPage = () => {
  const [url, setUrl] = useState('');
  const [isGenerate, setIsGenerate] = useState(false);
  const [data, setData] = useState({});

  const handleUrlChange = (text) => {
    setUrl(text);
    console.log(text);
  };

  const generate = () => {
    setIsGenerate(true);

    fetch('https://apimodule.codinghub.cloud/tools/generateQrcode?text=url')
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des modules:', error);
      });

    setIsGenerate(false);
  }

  return (
    <PositionedComponent
      backgroundColor="transparent" 
      positionContent="top-center">
         <WrapperComponent
          maxWidth={1100}>
            <div>
                <TitleComponent
                    text="Qrcode Generator"
                    isCenter={true}
                />
                <InputTextComponent
                    value={url}
                    onValueChanged={handleUrlChange}
                    placeholder="Enter url"
                />
                <SpacerComponent />
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {isGenerate ? <></> :  <img src={data.image} /> }
                </div>

                <SpacerComponent TextColor="black" /> 
                <ButtonComponent
                    text="Generate"
                    clickEvent={generate}
                    backgroundColor="var(--primary-color)"
                    borderColor="var(--primary-color)"
                    textColor="#fff"
                    width="100%"
                />
            </div>
          </WrapperComponent>
    </PositionedComponent> 
    
  );
};

export default QrcodeGeneratorPage;