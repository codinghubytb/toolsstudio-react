import React, { useState } from "react";

import PositionedComponent from "../../Library/PositionedComponent";
import WrapperComponent from "../../Library/WrapperComponent";
import ButtonComponent from "../../Library/ButtonComponent";
import TitleComponent from "../../Library/TitleComponent";
import SpacerComponent from "../../Library/SpacerComponent";
import InputTextComponent from "../../Library/InputTextComponent";
import LabelComponent from "../../Library/LabelComponent";

const MorseTable = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.",
  G: "--.", H: "....", I: "..", J: ".---", K: "-.-", L: ".-..",
  M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.",
  S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-",
  Y: "-.--", Z: "--..",
  0: "-----", 1: ".----", 2: "..---", 3: "...--", 4: "....-",
  5: ".....", 6: "-....", 7: "--...", 8: "---..", 9: "----.",
  " ": "/", // Use '/' as space in Morse code
};

const MorseConverterPage = () => {
  const [text, setText] = useState('');
  const [istexttomorse, setIsTextToMorse] = useState(true);
  const [result, setResult] = useState('');

  const handleTextChange = (text) => {
    setText(text);
  };

  const generate = () => {
    if(istexttomorse){
      texttomorse();
    }else{
      morsetotext();
    }
  }

  const changemode = () => {
    setIsTextToMorse(!istexttomorse)
  }

  const texttomorse = () => {
    setResult(text
      .toUpperCase()
      .split("")
      .map((char) => MorseTable[char] || "")
      .join(" ")
      .trim());
  }

  const morsetotext = () => {
    setResult(text
      .split(" / ")
      .map((word) =>
        word
          .split(" ")
          .map((letter) =>
            Object.entries(MorseTable).find(([, value]) => value === letter)?.[0] || ""
          )
          .join("")
      )
      .join(" "));
  }

  return (
    <PositionedComponent
      backgroundColor="transparent" 
      positionContent="top-center">
         <WrapperComponent
          maxWidth={1100}>
            <div>
                <TitleComponent
                    text="Morse Converter"
                    isCenter={true}
                />
                <SpacerComponent />
                <InputTextComponent 
                  value={text}
                  onValueChanged={handleTextChange}
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
                <ButtonComponent
                    text={istexttomorse ? "Morse To Text" : "Text To Morse" }
                    clickEvent={changemode}
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

export default MorseConverterPage;