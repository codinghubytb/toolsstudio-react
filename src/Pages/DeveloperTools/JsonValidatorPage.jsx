import React, { useState } from "react";

import PositionedComponent from "../../Library/PositionedComponent";
import WrapperComponent from "../../Library/WrapperComponent";
import ButtonComponent from "../../Library/ButtonComponent";
import TitleComponent from "../../Library/TitleComponent";
import SpacerComponent from "../../Library/SpacerComponent";
import LabelComponent from "../../Library/LabelComponent";
import InputTextareaComponent from "../../Library/InputTextareaComponent";

const JsonValidatorPage = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [error, setError] = useState('');

  const handleTextChange = (text) => {
    setJsonInput(text);
  };

  const validateJson = () => {
    try {
      JSON.parse(jsonInput);
      setIsValid(true);
      setError('')
    } catch (error) {
      setError(error)
      setIsValid(false);
    }
  };

  return (
    <PositionedComponent
      backgroundColor="transparent" 
      positionContent="top-center">
         <WrapperComponent
          maxWidth={1100}>
            <div>
                <TitleComponent
                    text="Json Validator"
                    isCenter={true}
                />

                <InputTextareaComponent
                    value={jsonInput}
                    onValueChanged={handleTextChange}
                    placeholder="Enter JSON"
                    borderColor="var(--primary-color)"
                />

                <SpacerComponent />

                <ButtonComponent
                    text="Validator"
                    clickEvent={validateJson}
                    backgroundColor="var(--primary-color)"
                    borderColor="var(--primary-color)"
                    textColor="#fff"
                    width="100%"
                />
                {isValid !== null && (
                <LabelComponent
                  text={isValid ? "✅ JSON valide." : `❌ Erreur : ${error}`}
                /> )}
            </div>
          </WrapperComponent>
    </PositionedComponent> 
    
  );
};

export default JsonValidatorPage;