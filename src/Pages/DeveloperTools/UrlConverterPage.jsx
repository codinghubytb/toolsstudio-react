import React, { useState } from "react";

import PositionedComponent from "../../Library/PositionedComponent";
import WrapperComponent from "../../Library/WrapperComponent";
import ButtonComponent from "../../Library/ButtonComponent";
import TitleComponent from "../../Library/TitleComponent";
import SpacerComponent from "../../Library/SpacerComponent";
import InputTextComponent from "../../Library/InputTextComponent";
import LabelComponent from "../../Library/LabelComponent";

const UrlConverterPage = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');

  const handleUrlChange = (text) => {
    setText(text);
  };

  const encoder = () => {
    setResult(encodeURIComponent(text));
  }

  const decoder = () => {
    setResult(decodeURIComponent(text));
  }

  return (
    <PositionedComponent
      backgroundColor="transparent" 
      positionContent="top-center">
         <WrapperComponent
          maxWidth={1100}>
            <div>
                <TitleComponent
                    text="Url Encoder/Decoder"
                    isCenter={true}
                />
                <SpacerComponent />
                <InputTextComponent 
                  value={text}
                  onValueChanged={handleUrlChange}
                  placeholder="Enter text"
                  borderColor="var(--primary-color)"
                  />

                <SpacerComponent />
                <div style={{display:"flex", gap:"10px"}}>

                <ButtonComponent
                    text="Encoder"
                    clickEvent={encoder}
                    backgroundColor="var(--primary-color)"
                    borderColor="var(--primary-color)"
                    textColor="#fff"
                    width="100%"
                />
                <ButtonComponent
                    text="Decoder"
                    clickEvent={decoder}
                    backgroundColor="var(--primary-color)"
                    borderColor="var(--primary-color)"
                    textColor="#fff"
                    width="100%"
                />
                </div>
                <SpacerComponent />

                <LabelComponent text="Result"/>
            <InputTextComponent 
              value={result}
              disabled
              placeholder="Result"
              maxlength="100000" />
            </div>
          </WrapperComponent>
    </PositionedComponent> 
    
  );
};

export default UrlConverterPage;