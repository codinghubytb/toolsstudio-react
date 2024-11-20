import React, { useState } from "react";

import PositionedComponent from "../../Library/PositionedComponent";
import WrapperComponent from "../../Library/WrapperComponent";
import ButtonComponent from "../../Library/ButtonComponent";
import TitleComponent from "../../Library/TitleComponent";
import SpacerComponent from "../../Library/SpacerComponent";
import InputTextComponent from "../../Library/InputTextComponent";
import LabelComponent from "../../Library/LabelComponent";

const HashSHA256 = (inputString) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(inputString);
  
    return crypto.subtle.digest('SHA-256', data).then((hashBuffer) => {
      // Convert the hash buffer to a hex string
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
      return hashHex;
    });
  };

const HashGeneratorPage = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleInputChange = (text) => {
    setInput(text);
  };

  const generate = async () => {
    const hash = await HashSHA256(input);
    setResult(hash);
  }

  return (
    <PositionedComponent
      backgroundColor="transparent" 
      positionContent="top-center">
         <WrapperComponent
          maxWidth={1100}>
            <div>
                <TitleComponent
                    text="Hash Generator"
                    isCenter={true}
                />
                <SpacerComponent />
                <InputTextComponent 
                  value={input}
                  onValueChanged={handleInputChange}
                  placeholder="Enter text"
                  borderColor="var(--primary-color)"
                  />

                <SpacerComponent />
                <div style={{display:"flex", gap:"10px"}}>

                <ButtonComponent
                    text="Generate"
                    clickEvent={generate}
                    backgroundColor="var(--primary-color)"
                    borderColor="var(--primary-color)"
                    textColor="#fff"
                    width="100%"
                />
                </div>
                <SpacerComponent />

                <LabelComponent text="Hash SHA256"/>
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

export default HashGeneratorPage;