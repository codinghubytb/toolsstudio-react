import React, { useState } from "react";

import PositionedComponent from "../../Library/PositionedComponent";
import WrapperComponent from "../../Library/WrapperComponent";
import ButtonComponent from "../../Library/ButtonComponent";
import TitleComponent from "../../Library/TitleComponent";
import SpacerComponent from "../../Library/SpacerComponent";
import LabelComponent from "../../Library/LabelComponent";
import InputTextareaComponent from "../../Library/InputTextareaComponent";

const CodeBeautifierPage = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [extension, setExtension] = useState(""); 

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


  const beautifyJson = () => {
    setError(false);
    if (!input.trim()) {
      setError(true);
      setOutput("Error: Input is empty.");
      return;
    }
    try {
      setExtension("json");
      const json = JSON.parse(input);
      setOutput(JSON.stringify(json, null, 2)); // Beautifies JSON with 2-space indentation
    } catch (ex) {
      setError(true);
      setOutput(`Error: ${ex.message}`);
    }
  };

  const beautifyXml = () => {
    setError(false);
    if (!input.trim()) {
      setError(true);
      setOutput("Error: Input is empty.");
      return;
    }
    try {
      setExtension("xml");
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(input, "application/xml");

      // Check for parsing errors
      if (xmlDoc.getElementsByTagName("parsererror").length) {
        throw new Error("Invalid XML format.");
      }

      const serializer = new XMLSerializer();
      const formattedXml = serializer.serializeToString(xmlDoc);
      setOutput(formatXml(formattedXml));
    } catch (ex) {
      setError(true);
      setOutput(`Error: ${ex.message}`);
    }
  };

  const formatXml = (xml) => {
    const PADDING = "  "; // 2 spaces for indentation
    const reg = /(>)(<)(\/*)/g;
    let formatted = "";
    let pad = 0;

    // Add newlines between tags
    xml = xml.replace(reg, "$1\n$2$3");
    xml.split("\n").forEach((node) => {
      let indent = 0;
      if (node.match(/.+<\/\w[^>]*>$/)) {
        indent = 0; // No change
      } else if (node.match(/^<\/\w/)) {
        if (pad > 0) pad -= 1; // Closing tag
      } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
        indent = 1; // Opening tag
      }

      formatted += PADDING.repeat(pad) + node + "\n";
      pad += indent;
    });

    return formatted.trim();
  };

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output).then(() => {
        setError('');  // Clear any previous error
        alert(`${extension.toUpperCase()} copied to clipboard!`);
      }).catch(err => setError('Failed to copy text.'));
    }
  };

  const downloadJson = () => {
    if (output) {
      const mimetype = `application/${extension.toLowerCase()}`
      const blob = new Blob([output], { type: mimetype });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `output.${extension.toLowerCase()}`;
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
                    text="Beautify JSON/XML code"
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
                            accept=".json, .xml"
                        />
                </div>

                <LabelComponent text={error} textColor="red" />
                <InputTextareaComponent
                    value={input}
                    onValueChanged={value => setInput(value)}
                    placeholder="Paste your JSON or XML code here"
                    fontSize="12px"
                    borderColor="var(--primary-color)"
                />

                <SpacerComponent />

                <div style={{display: "flex", gap:"10px", 
                justifyContent: "space-around"}}>
                <ButtonComponent
                    text="Beautifier JSON"
                    clickEvent={beautifyJson}
                    backgroundColor="var(--primary-color)"
                    borderColor="var(--primary-color)"
                    textColor="#fff"
                    width="100%"    
                />
                <ButtonComponent
                    text="Beautifier XML"
                    clickEvent={beautifyXml}
                    backgroundColor="var(--primary-color)"
                    borderColor="var(--primary-color)"
                    textColor="#fff"
                    width="100%"    
                />
                </div>
                
                <LabelComponent text="Result XML" 
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
                    placeholder="Result JSON or XML"
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


export default CodeBeautifierPage;