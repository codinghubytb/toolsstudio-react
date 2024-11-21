import React, { useState } from "react";

import PositionedComponent from "../../Library/PositionedComponent";
import WrapperComponent from "../../Library/WrapperComponent";
import ButtonComponent from "../../Library/ButtonComponent";
import TitleComponent from "../../Library/TitleComponent";
import SpacerComponent from "../../Library/SpacerComponent";
import LabelComponent from "../../Library/LabelComponent";
import InputFileComponent from "../../Library/InputFileComponent";
import InputTextareaComponent from "../../Library/InputTextareaComponent";

const MinifierPage = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const maxFileSize = 1024 * 100; // 100 KB

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Récupère le fichier sélectionné
    if (!file) {
      setError("No file selected.");
      return;
    }

    if (file.size > maxFileSize) {
      // Vérifie la taille du fichier
      setError("The file is too large. Please select a file less than 100 KB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setInput(e.target.result); // Stocke le contenu du fichier dans l'état
      setError(""); // Réinitialise les erreurs
    };
    reader.onerror = () => {
      setError("Error reading the file.");
    };
    reader.readAsText(file); // Lit le contenu du fichier comme texte
  };


  const minifier = () => {
    if (!input.trim()) {
        setOutput('Error: Input is empty.');
        return;
    }

    // Supprime les espaces et les sauts de ligne pour une minification simple
    const minified = input.replace(/\n/g, '').replace(/\r/g, '').replace(/ {2,}/g, ' ');
    setOutput(minified);
  }

  return (
    <PositionedComponent
      backgroundColor="transparent" 
      positionContent="top-center">
         <WrapperComponent
          maxWidth={1100}>
            <div>
                <TitleComponent
                    text="CSS/JS Minifier"
                    isCenter={true}
                />
                <SpacerComponent />

                <div style={{display: "flex",
                justifyContent:"space-between"
                }}>
                    <LabelComponent
                        text="Max: 100ko"
                        textColor="#000"/>
                        
                        <label htmlFor="fileInput" style={{ cursor: "pointer", color: "blue" }}>
                            Upload File
                        </label>
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                            accept=".css, .js, .json, .xml, .csv"
                        />
                </div>

                <InputTextareaComponent
                    value={error ? error : input}
                    onValueChanged={value => setInput(value)}
                    placeholder="Enter text"
                    fontSize="12px"
                    borderColor="var(--primary-color)"
                />

                <SpacerComponent />

                <ButtonComponent
                    text="Convert"
                    clickEvent={minifier}
                    backgroundColor="var(--primary-color)"
                    borderColor="var(--primary-color)"
                    textColor="#fff"
                    width="100%"    
                />
                
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

                <InputTextareaComponent
                    value={output}
                    onValueChanged={value => setOutput(value)}
                    placeholder="Result"
                    fontSize="12px"
                    disabled
                    maxlength={100000}
                    borderColor="var(--primary-color)"
                />
            </div>
          </WrapperComponent>
    </PositionedComponent> 
    
  );
};


export default MinifierPage;;