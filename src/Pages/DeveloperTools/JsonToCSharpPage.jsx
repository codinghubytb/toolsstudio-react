import React, { useState } from "react";

import PositionedComponent from "../../Library/PositionedComponent";
import WrapperComponent from "../../Library/WrapperComponent";
import ButtonComponent from "../../Library/ButtonComponent";
import TitleComponent from "../../Library/TitleComponent";
import SpacerComponent from "../../Library/SpacerComponent";
import LabelComponent from "../../Library/LabelComponent";
import InputTextareaComponent from "../../Library/InputTextareaComponent";

const JsonToCSharpPage = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);  // Indicateur de chargement

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


  const capitalizeFirstLetter = (input) => {
    if (!input) return input;
    return input.charAt(0).toUpperCase() + input.slice(1);
  };

  const getSimplifiedType = (value) => {
    switch (typeof value) {
      case "string":
        return "string";
      case "boolean":
        return "bool";
      case "number":
        return Number.isInteger(value) ? "int" : "float";
      default:
        if (value instanceof Date) return "DateTime";
        return "object";
    }
  };

  const generateCSharpClass = (jsonObject, className, generatedClasses) => {
    if (generatedClasses.has(className)) return ""; // Skip if already generated
  
    generatedClasses.add(className); // Mark class as generated
    let classResult = `public class ${className} {\n`;
  
    const childClasses = [];
    const keyValueDictionary = {};
  
    for (const [key, value] of Object.entries(jsonObject)) {
      const propertyName = capitalizeFirstLetter(key.replace(/_/g, "").replace(/\$/g, ""));
      if (Array.isArray(value)) {
        if (value.length > 0 && typeof value[0] === "object") {
          const childClassName = capitalizeFirstLetter(propertyName);
          classResult += `\tpublic List<${childClassName}> ${propertyName} { get; set; }\n`;
          value.forEach((item) => {
            if (typeof item === "object") {
              childClasses.push(generateCSharpClass(item, childClassName, generatedClasses));
            }
          });
        } else {
          classResult += `\tpublic List<string> ${propertyName} { get; set; }\n`;
        }
      } else if (typeof value === "object" && value !== null) {
        const childClassName = capitalizeFirstLetter(propertyName);
        classResult += `\tpublic ${childClassName} ${propertyName} { get; set; }\n`;
        childClasses.push(generateCSharpClass(value, childClassName, generatedClasses));
      } else {
        keyValueDictionary[propertyName] = value;
      }
    }
  
    Object.entries(keyValueDictionary).forEach(([key, value]) => {
      classResult += `\tpublic ${getSimplifiedType(value)} ${key} { get; set; }\n`;
    });
  
    classResult += "}\n\n";
  
    childClasses.forEach((childClass) => {
      classResult += childClass;
    });
  
    return classResult;
  };
  

  const validateJson = () => {
    try {
      JSON.parse(input);
      return true;
    } catch (err) {
      return false;
    }
  };

  const convert = () => {
    setError(false);
    if (!input.trim()) {
      setError(true);
      setOutput("Error: Input is empty.");
      return;
    }
  
    try {
      const parsedInput = JSON.parse(input);
      const generatedClasses = new Set();
      let result = "";
  
      if (Array.isArray(parsedInput)) {
        result += generateCSharpClass(parsedInput[0], "Root", generatedClasses);
        result += `public class RootList {\n\tpublic List<Root> Items { get; set; } = new List<Root>();\n}\n`;
      } else {
        result += generateCSharpClass(parsedInput, "Root", generatedClasses);
      }
  
      setOutput(result);
    } catch (err) {
      setError(true);
      setOutput("Error: Invalid JSON.");
    }
  };
  
  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output).then(() => {
        setError('');  // Clear any previous error
        alert('XML copied to clipboard!');
      }).catch(err => setError('Failed to copy text.'));
    }
  };

  const downloadJson = () => {
    if (output) {
      const blob = new Blob([output], { type: 'application/xml' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'output.xml';
      link.click();
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
                    text="JSON to C#"
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
                            accept=".json"
                        />
                </div>

                <LabelComponent text={error} textColor="red" />
                <InputTextareaComponent
                    value={input}
                    onValueChanged={value => setInput(value)}
                    placeholder="Enter JSON"
                    fontSize="12px"
                    borderColor="var(--primary-color)"
                />

                <SpacerComponent />

                <ButtonComponent
                    text="Convert"
                    clickEvent={convert}
                    backgroundColor="var(--primary-color)"
                    borderColor="var(--primary-color)"
                    textColor="#fff"
                    width="100%"    
                />
                
                <LabelComponent text="Result c#" 
                textColor="var(--text-color)" />
                        
                <div style={{display: "flex", gap:"10px", 
                justifyContent: "space-around"}}>
                     <ButtonComponent
                      text="Copy"
                      backgroundColor="var(--primary-color)"
                      borderColor="var(--primary-color)"
                      textColor="#fff"
                      width="100%"
                      active={!output}
                      clickEvent={copyToClipboard}
                    />
                    <ButtonComponent
                      text="Download"
                      active={!output}
                      backgroundColor="var(--primary-color)"
                      borderColor="var(--primary-color)"
                      textColor="#fff"
                      width="100%"
                      clickEvent={downloadJson}
                    />
                </div>

                <InputTextareaComponent
                    value={output}
                    onValueChanged={value => setOutput(value)}
                    placeholder="Result c#"
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


export default JsonToCSharpPage;