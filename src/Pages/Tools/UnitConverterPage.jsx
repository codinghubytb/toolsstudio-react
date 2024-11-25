import React, { useState } from "react";
import PositionedComponent from "../../Library/PositionedComponent";
import WrapperComponent from "../../Library/WrapperComponent";
import TitleComponent from "../../Library/TitleComponent";
import SpacerComponent from "../../Library/SpacerComponent";
import SelectInputComponent from "../../Library/SelectInputComponent";
import ButtonComponent from "../../Library/ButtonComponent";
import LabelComponent from "../../Library/LabelComponent";
import InputTextComponent from "../../Library/InputTextComponent";
import InputNumberComponent from "../../Library/InputNumberComponent"

import { ConvertUnit, Unit, conversions } from "../../enums/unitsenum";

const UnitConverterPage = () => {
  const [input, setInput] = useState('');
  const [convertUnit, setConvertUnit] = useState("Temperature"); // Catégorie sélectionnée
  const [unitFrom, setUnitFrom] = useState(Object.keys(Unit[convertUnit] || {})[0]); // Unité source
  const [unitTo, setUnitTo] = useState(Object.keys(Unit[convertUnit] || {})[1]); // Unité cible
  const [result, setResult] = useState(''); // Résultat de la conversion

  const unitsForSelectedCategory = Unit[convertUnit] || {};

  const convert = () => {
    const value = parseFloat(input);
    if (isNaN(value)) {
      setResult("Invalid input");
      return;
    }

    try {
      const conversionFunction = conversions[convertUnit]?.[`${unitFrom}To${unitTo}`];
      if (conversionFunction) {
        const convertedValue = conversionFunction(value);
        setResult(convertedValue.toString() + ' ' + unitTo);
      } else {
        setResult("Conversion not supported");
      }
    } catch (error) {
      setResult("Error during conversion");
    }
  };

  const getUnitLabel = (unitCode) => {
    const unit = unitsForSelectedCategory[unitCode];
    return unit?.name && unit?.symbol ? `${unit.name} (${unit.symbol})` : unit;
  };

  return (
    <PositionedComponent backgroundColor="transparent" positionContent="top-center">
      <WrapperComponent maxWidth={1100}>
        <div>
          <TitleComponent text="Unit Converter" isCenter={true} />
          <SpacerComponent numberSpace={2} />
          
          <InputNumberComponent
            value={input}
            onValueChanged={(value) => {
              setInput(value);
              setResult('');
            }}
            placeholder="Enter a number"
            borderColor="var(--primary-color)"
          />
          <SpacerComponent />
          
          <LabelComponent text="Convert" />
          <SelectInputComponent
            value={convertUnit}
            onValueChanged={(value) => {
              setConvertUnit(value);
              setResult('');
              setUnitFrom(Object.keys(Unit[value] || {})[0]);
              setUnitTo(Object.keys(Unit[value] || {})[1]);
            }}
            textColor="#000"
            width={100}
          >
            {Object.entries(ConvertUnit).map(([code, name]) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </SelectInputComponent>

          <SpacerComponent />
          <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
            <div style={{ width: "100%" }}>
              <LabelComponent text="From" />
              <SelectInputComponent
                value={unitFrom}
                onValueChanged={(value) => {
                  setUnitFrom(value);
                  setResult('');
                }}
                textColor="#000"
                width={100}
              >
                {Object.entries(unitsForSelectedCategory).map(([code, unit]) => (
                  <option key={code} value={code}>{getUnitLabel(code)}</option>
                ))}
              </SelectInputComponent>
            </div>
            <div style={{ width: "100%" }}>
              <LabelComponent text="To" />
              <SelectInputComponent
                value={unitTo}
                onValueChanged={(value) => {
                  setUnitTo(value);
                  setResult('');
                }}
                textColor="#000"
                width={100}
              >
                {Object.entries(unitsForSelectedCategory).map(([code, unit]) => (
                  <option key={code} value={code}>{getUnitLabel(code)}</option>
                ))}
              </SelectInputComponent>
            </div>
          </div>

          <SpacerComponent numberSpace={2} />

          <ButtonComponent 
            backgroundColor="var(--primary-color)"
            textColor="white"
            text="Convert"
            clickEvent={convert} />

          <SpacerComponent numberSpace={2} />

          <InputTextComponent
            value={result}
            placeholder="Result"
            disabled
            borderColor="var(--primary-color)"
          />
        </div>
      </WrapperComponent>
    </PositionedComponent>
  );
};

export default UnitConverterPage;
