import React, { useState } from "react";

import PositionedComponent from "../../Library/PositionedComponent";
import WrapperComponent from "../../Library/WrapperComponent";
import ButtonComponent from "../../Library/ButtonComponent";
import TitleComponent from "../../Library/TitleComponent";
import SpacerComponent from "../../Library/SpacerComponent";
import InputTextComponent from "../../Library/InputTextComponent";
import BulletComponent from "../../Library/BulletComponent";
import BulletListComponent from "../../Library/BulletListComponent";
import LabelComponent from "../../Library/LabelComponent";
import InputCheckboxComponent from "../../Library/InputCheckboxComponent";

const RegexGeneratorPage = () => {
  const [result, setResult] = useState('');
  const [lowercase, setLowercase] = useState(false);
  const [uppercase, setUppercase] = useState(false);
  const [digits, setDigits] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [mustEndWith, setMustEndWith] = useState(false);
  const [mustStartWith, setMustStartWith] = useState(false);
  const [startCharacter, setStartCharacter] = useState("");
  const [endCharacter, setEndCharacter] = useState("");

  const generateRegex = () => {
    if (!digits && !lowercase && !uppercase && !symbols) {
        setResult('Please tick one');
        return;
    }

    let regex = '^';

    if (mustStartWith && startCharacter) {
        regex += startCharacter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape special regex characters
    }

    regex += '[';

    if (digits) regex += '\\d';
    if (lowercase) regex += 'a-z';
    if (uppercase) regex += 'A-Z';
    if (symbols) regex += '\\W';

    regex += ']*';

    if (mustEndWith && endCharacter) {
        regex += endCharacter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$';
    }

    setResult(regex);
  }

  return (
    <PositionedComponent
      backgroundColor="transparent" 
      positionContent="top-center">
         <WrapperComponent
          maxWidth={1100}>
            <div>
                <TitleComponent
                    text="Regex Generator"
                    isCenter={true}
                />
                <SpacerComponent />
                <InputTextComponent 
                value={result}
                onValueChanged={value => setResult(value)}
                placeholder="Regex Loading ..."
                disabled
                borderColor="var(--primary-color)"
                />

                <SpacerComponent />
                <LabelComponent text="Regex Settings" />

                <BulletListComponent>
                    <BulletComponent>
                        <InputCheckboxComponent
                            label="Digits ? (0-9)" 
                            value={digits}
                            id="digits"
                            onValueChanged={value => setDigits(value)}/>
                    </BulletComponent>
                    <BulletComponent>
                        <InputCheckboxComponent
                            label="Lowercase Letters ? (a-z)" 
                            value={lowercase}
                            id="lowercase"
                            onValueChanged={value => setLowercase(value)}/>
                    </BulletComponent>
                    <BulletComponent>
                        <InputCheckboxComponent
                            label="Uppercase Letters ? (A-Z)" 
                            value={uppercase}
                            id="uppercase"
                            onValueChanged={value => setUppercase(value)}/>
                    </BulletComponent>
                    <BulletComponent>
                        <InputCheckboxComponent
                            label="Symbols ? (#, $ ...)" 
                            value={symbols}
                            id="symbols"
                            onValueChanged={value => setSymbols(value)}/>
                    </BulletComponent>
                    <BulletComponent>
                        <div style={{display: "flex", flexWrap: "wrap",
                             width: "90%"}}>
                            <InputCheckboxComponent 
                                label="Commencer par :" 
                                value={mustStartWith}
                                id="mustStartWith"  
                                onValueChanged={value => setMustStartWith(value)}
                                 />
                            <InputTextComponent 
                                value={startCharacter} 
                                id="startCharacter"  
                                onValueChanged={value => setStartCharacter(value)}/>
                        </div>
                    </BulletComponent>
                    <BulletComponent>
                            <div style={{display: "flex", flexWrap: "wrap",
                                width: "90%"}}>
                                <InputCheckboxComponent 
                                    label="Finir par :" 
                                    value={mustEndWith}
                                    id="mustEndWith"  
                                    onValueChanged={value => setMustEndWith(value)}
                                         />
                                <InputTextComponent 
                                    value={endCharacter} 
                                    id="endCharacter"  
                                    onValueChanged={value => setEndCharacter(value)} />
                            </div>
                    </BulletComponent>
                </BulletListComponent>

                <SpacerComponent />
                <ButtonComponent
                    text="Generate Regex"
                    clickEvent={generateRegex}
                    backgroundColor="var(--primary-color)"
                    borderColor="var(--primary-color)"
                    textColor="#fff"
                />
                
            </div>
        </WrapperComponent>
    </PositionedComponent> 
    
  );
};

export default RegexGeneratorPage;