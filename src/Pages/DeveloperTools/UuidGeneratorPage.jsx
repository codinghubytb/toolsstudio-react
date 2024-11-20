import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import PositionedComponent from "../../Library/PositionedComponent";
import WrapperComponent from "../../Library/WrapperComponent";
import ButtonComponent from "../../Library/ButtonComponent";
import TitleComponent from "../../Library/TitleComponent";
import SpacerComponent from "../../Library/SpacerComponent";

const UuidGeneratorPage = () => {
  const [uuid, setUuid] = useState('');

  const generate = () => {
    setUuid(uuidv4());
  };

  return (
    <PositionedComponent
      backgroundColor="transparent" 
      positionContent="top-center">
         <WrapperComponent
          maxWidth={1100}>
            <div>
                <TitleComponent
                    text="Uuid Generator"
                    isCenter={true}
                />
                <hr />
                <TitleComponent
                    text={uuid.toString()}
                    isCenter={true}
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

export default UuidGeneratorPage;