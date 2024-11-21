import React, { useState } from "react";

import PositionedComponent from "../../Library/PositionedComponent";
import WrapperComponent from "../../Library/WrapperComponent";
import ButtonComponent from "../../Library/ButtonComponent";
import TitleComponent from "../../Library/TitleComponent";
import SpacerComponent from "../../Library/SpacerComponent";
import LabelComponent from "../../Library/LabelComponent";
import InputNumberComponent from "../../Library/InputNumberComponent";
import InputTextareaComponent from "../../Library/InputTextareaComponent";

const JsonValidatorPage = () => {
  const [numberOfObjects, setNumberOfObjects] = useState(5);
  const [jsonStructure , setJsonStructure] = useState('');
  const [output, setOutput] = useState('');


  const generateMockJson = () => {
    if (!jsonStructure.trim()) {
        setError(true);
        setOutput('Error: Input is empty.');
        return;
    }

    const objectsList = [];
    const structure = Object.fromEntries(
        jsonStructure
            .split(',')
            .map((s) => s.trim().split(':').map((part) => part.trim()))
    );

    for (let i = 0; i < numberOfObjects; i++) {
        const obj = {};
        for (const [key, type] of Object.entries(structure)) {
            obj[key] = generateValue(key, type);
        }
        objectsList.push(obj);
    }

    setOutput(JSON.stringify(objectsList, null, 2)); // Pretty print JSON
    };

    const generateValue = (key, type) => {
        switch (type) {
            case 'string':
                return generateRandomString(key);
            case 'int':
                return Math.floor(Math.random() * 100) + 1;
            case 'bool':
                return Math.random() < 0.5;
            case 'float':
                return Math.random();
            case 'double':
                return Math.random() * 100;
            case 'datetime':
                return new Date().toISOString();
            default:
                return null;
        }
    };

    const generateRandomString = (key) => {
        if (key.toLowerCase() === 'email') {
            return `email${Math.floor(Math.random() * 100) + 1}@example.com`;
        }
        return `${key} Value ${Math.floor(Math.random() * 100) + 1}`;
    };


  return (
    <PositionedComponent
      backgroundColor="transparent" 
      positionContent="top-center">
         <WrapperComponent
          maxWidth={1100}>
            <div>
                <TitleComponent
                    text="Generator JSON Mock"
                    isCenter={true}
                />
                <SpacerComponent />
                <LabelComponent text="Number of objects to generate :" />
                <InputNumberComponent
                    value={numberOfObjects}
                    onValueChanged={value => setNumberOfObjects(value)}
                    min={1}
                    max={1000}
                />

                <SpacerComponent />

                <LabelComponent text="JSON structure (Key, Type):" />

                <InputTextareaComponent
                    value={jsonStructure}
                    onValueChanged={value => setJsonStructure(value)}
                    placeholder="Ex: id:string,name:string,email:string"
                    row={2}
                    borderColor="var(--primary-color)" />

                <SpacerComponent />
                
                <ButtonComponent
                    text="Generate"
                    clickEvent={generateMockJson}
                    backgroundColor="var(--primary-color)"
                    borderColor="var(--primary-color)"
                    textColor="#fff"
                    width="100%"
                />
                <SpacerComponent />
                <LabelComponent text="Result" 
                textColor="var(--text-color)" />
                        
                <div style={{display: "flex", gap:"10px", 
                justifyContent: "space-around"}}>
                    <ButtonComponent
                        text="Copy"
                        backgroundColor="var(--primary-color)"
                        borderColor="var(--primary-color)"
                        textColor="#fff"
                        width="100%"
                        active={true}
                    />
                    <ButtonComponent
                        text="Download"
                        active={true}
                        backgroundColor="var(--primary-color)"
                        borderColor="var(--primary-color)"
                        textColor="#fff"
                        width="100%"
                    />
                </div>
            </div>
            <InputTextareaComponent
                value={output}
                onValueChanged={value => setOutput(value)}
                borderColor="var(--primary-color)"
                disabled
                row={7}
                fontSize="12px"
                placeholder="Result"
                maxlength={100000} />
          </WrapperComponent>
    </PositionedComponent> 
    
  );
};

export default JsonValidatorPage;