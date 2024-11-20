import React, { useState } from "react";

import PositionedComponent from "../../Library/PositionedComponent";
import WrapperComponent from "../../Library/WrapperComponent";
import ButtonComponent from "../../Library/ButtonComponent";
import TitleComponent from "../../Library/TitleComponent";
import InputNumberComponent from "../../Library/InputNumberComponent";
import SpacerComponent from "../../Library/SpacerComponent";

const NumberGeneratorPage = () => {
  const [number, setNumber] = useState(0);
  const [max, setMax] = useState(100);

  const handleMaxChange = (newValue) => {
    setMax(newValue);
  };

  const generate = () => {
    setNumber(Math.floor(Math.random() * max) + 1);
  };

  return (
    <PositionedComponent
      backgroundColor="transparent" 
      positionContent="top-center">
         <WrapperComponent
          maxWidth={1100}>
            <div>
                <TitleComponent
                    text="Number Generator"
                    isCenter={true}
                />
                <hr />
                <TitleComponent
                    text={number.toString()}
                    fontSize={80}
                    isCenter={true}
                />
                <InputNumberComponent
                    value={max}
                    onValueChange={handleMaxChange}
                    min={0}
                    max={1000000}
                    placeholder="Enter max number"
                    textColor="#333"
                />
                <SpacerComponent />
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

export default NumberGeneratorPage;