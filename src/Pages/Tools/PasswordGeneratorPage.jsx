import React, { useState, useEffect } from "react";

import PositionedComponent from "../../Library/PositionedComponent";
import WrapperComponent from "../../Library/WrapperComponent";
import ButtonComponent from "../../Library/ButtonComponent";
import TitleComponent from "../../Library/TitleComponent";
import SpacerComponent from "../../Library/SpacerComponent";
import InputTextComponent from "../../Library/InputTextComponent";
import InputRangeComponent from "../../Library/InputRangeComponent";

const PasswordGeneratorPage = () => {
    const [output, setOutput] = useState("");
    const [passwordlenght, setPasswordlenght] = useState(30);
   
    const handleLenghtChange = (value) => {
        setPasswordlenght(value);
    };

    const generate = () => {
        setOutput("bonjour");
    };
    return (
        <PositionedComponent
          backgroundColor="transparent" 
          positionContent="top-center">
             <WrapperComponent
              maxWidth={1100}>
                <div>
                    <TitleComponent
                        text="Password Generator"
                        isCenter={true}
                    />
    
                    <InputTextComponent
                        value={output}
                        placeholder="Generate Password"
                        row={4}
                        borderColor="var(--primary-color)"
                    />
                    
                    <div className="pass-length">
                        <div className="details">
                            <label className="title">Password Length</label>
                            <span> {passwordlenght}</span>
                        </div>

                        <InputRangeComponent
                            min={1}
                            max={30}
                            step={1}
                            value={{passwordlenght}} 
                            onValueChanged={handleLenghtChange}/>
                    </div>

                    <SpacerComponent />

                    <ButtonComponent 
                        text="Generate"
                        clickEvent={generate}
                        backgroundColor="var(--primary-color)"
                        borderColor="var(--primary-color)"
                        textColor="#fff"
                        width="100%" />
                </div>
              </WrapperComponent>
        </PositionedComponent> 
        
      );

};

export default PasswordGeneratorPage;