import React, { useState, useEffect } from "react";

import PositionedComponent from "../../Library/PositionedComponent";
import WrapperComponent from "../../Library/WrapperComponent";
import ButtonComponent from "../../Library/ButtonComponent";
import TitleComponent from "../../Library/TitleComponent";
import SpacerComponent from "../../Library/SpacerComponent";
import BulletComponent from "../../Library/BulletComponent";
import BulletListComponent from "../../Library/BulletListComponent";
import InputCheckboxComponent from "../../Library/InputCheckboxComponent";
import InputTextComponent from "../../Library/InputTextComponent";
import InputRangeComponent from "../../Library/InputRangeComponent";

const PasswordGeneratorPage = () => {
    const Lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const Uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const Numbers = '0123456789';
    const Symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const Space = ' ';

    const [passwordLength, setPasswordLength] = useState(12);
    const [excludeDuplicate, setExcludeDuplicate] = useState(false);
    const [lowercase, setLowercase] = useState(true);
    const [uppercase, setUppercase] = useState(true);
    const [numbers, setNumbers] = useState(true);
    const [symbols, setSymbols] = useState(true);
    const [includeSpaces, setIncludeSpaces] = useState(false);
    const [passwordResult, setPasswordResult] = useState('');


    const buildCharacterPool = () => {
        let pool = '';

        if (lowercase) pool += Lowercase;
        if (uppercase) pool += Uppercase;
        if (numbers) pool += Numbers;
        if (symbols) pool += Symbols;
        if (includeSpaces) pool += Space;

        return pool;
    };

    const generatePassword = () => {
        const characterPool = buildCharacterPool();
        const usedCharacters = new Set();
        let newPassword = '';

        if (!characterPool) {
            setPasswordResult('Please select at least one character set.');
            return;
        }

        while (newPassword.length < passwordLength) {
            const newChar = characterPool[Math.floor(Math.random() * characterPool.length)];

            if (excludeDuplicate && usedCharacters.has(newChar)) {
                continue;
            }

            newPassword += newChar;
            usedCharacters.add(newChar);
        }

        setPasswordResult(newPassword);
    };

    return (
        <>
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
                        value={passwordResult}
                        placeholder="Generate Password"
                        row={4}
                        borderColor="var(--primary-color)"
                    />
                    
                    <div className="pass-length">
                        <div className="details">
                            <label className="title">Password Length</label>
                            <span> {passwordLength}</span>
                        </div>

                        <InputRangeComponent
                            min={1}
                            max={30}
                            step={1}
                            value={{passwordLength}} 
                            onValueChanged={value => setPasswordLength(value)}/>
                    </div>

                    <div className="pass-settings">
                    <label className="title">Password Settings</label>

                    <BulletListComponent>
                        <BulletComponent>
                            <InputCheckboxComponent
                                label="Lowercase (a-z)" 
                                value={lowercase}
                                id="lowercase"
                                onValueChanged={value => setLowercase(value)}/>
                        </BulletComponent>
                        <BulletComponent>
                            <InputCheckboxComponent
                                label="Uppercase (A-Z)" 
                                value={uppercase}
                                id="uppercase"
                                onValueChanged={value => setUppercase(value)}/>
                        </BulletComponent>
                        <BulletComponent>
                            <InputCheckboxComponent
                                label="Numbers (0-9)" 
                                value={numbers}
                                id="numbers"
                                onValueChanged={value => setNumbers(value)}/>
                        </BulletComponent>
                        <BulletComponent>
                            <InputCheckboxComponent
                                label="Symbols (!-$^+)" 
                                value={symbols}
                                id="symbols"
                                onValueChanged={value => setSymbols(value)}/>
                        </BulletComponent>
                        <BulletComponent>
                            <InputCheckboxComponent
                                label="Exclude Duplicate" 
                                value={excludeDuplicate}
                                id="excludeDuplicate"
                                onValueChanged={value => setExcludeDuplicate(value)}/>
                        </BulletComponent>
                        <BulletComponent>
                            <InputCheckboxComponent
                                label="Include Spaces" 
                                value={includeSpaces}
                                id="includeSpaces"
                                onValueChanged={value => setIncludeSpaces(value)}/>
                        </BulletComponent>
                    </BulletListComponent>
                    <SpacerComponent />

                    <ButtonComponent 
                        text="Generate"
                        clickEvent={generatePassword}
                        backgroundColor="var(--primary-color)"
                        borderColor="var(--primary-color)"
                        textColor="#fff"
                        width="100%" />
                </div>
                </div>
              </WrapperComponent>
        </PositionedComponent> 
        
        <style>{`
            .pass-length {
                margin: 1.56rem 0 1.25rem;
            }

                .pass-length .details {
                    display: flex;
                    justify-content: space-between;
                }

                .pass-length input {
                    width: 100%;
                    height: 5px;
                }`}
        </style>
    </>
);

};

export default PasswordGeneratorPage;