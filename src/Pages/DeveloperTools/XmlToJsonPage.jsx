import React, { useState } from "react";

import PositionedComponent from "../../Library/PositionedComponent";
import WrapperComponent from "../../Library/WrapperComponent";
import ButtonComponent from "../../Library/ButtonComponent";
import TitleComponent from "../../Library/TitleComponent";
import SpacerComponent from "../../Library/SpacerComponent";
import LabelComponent from "../../Library/LabelComponent";
import InputTextareaComponent from "../../Library/InputTextareaComponent";

const XmlToJsonPage = () => {
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

  const convert = () => {
    setLoading(true);
    const apiUrl = import.meta.env.VITE_APIMODULE;
    setError('');
    fetch(`${apiUrl}/toolsdeveloper/xmltojson?input=${encodeURIComponent(input)}`)
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        if (data && data.message) {
          setOutput(data.message); // Assuming setOutput is a function that updates the UI
        } else {
          setError(data.error);
        }
      })
      .catch(error => {
        setLoading(false);
        setError('There was a problem with the fetch operation.');
      });
  };

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output).then(() => {
        setError('');  // Clear any previous error
        alert('JSON copied to clipboard!');
      }).catch(err => setError('Failed to copy text.'));
    }
  };

  const downloadJson = () => {
    if (output) {
      const blob = new Blob([output], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'output.json';
      link.click();
    }
  };

  return (
    <PositionedComponent
      backgroundColor="transparent"
      positionContent="top-center">
      <WrapperComponent maxWidth={1100}>
        <div>
          <TitleComponent
            text="XML to JSON"
            isCenter={true}
          />
          <SpacerComponent />

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <LabelComponent text="Max: 100ko" textColor="#000" />
            <label htmlFor="fileInput" style={{ cursor: "pointer", color: "blue" }}>
              Upload File
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleFileChange}
              accept=".xml"
            />
          </div>

          <LabelComponent text={error} textColor="red" />
          <InputTextareaComponent
            value={input}
            onValueChanged={value => setInput(value)}
            placeholder="Enter XML"
            fontSize="12px"
            borderColor="var(--primary-color)"
          />

          <SpacerComponent />

          <ButtonComponent
            text={loading ? "Converting..." : "Convert"}
            clickEvent={convert}
            backgroundColor="var(--primary-color)"
            borderColor="var(--primary-color)"
            textColor="#fff"
            width="100%"
            disabled={loading}  // Disable the button while loading
          />

          <LabelComponent text="Result JSON"
            textColor="var(--text-color)" />

          <div style={{ display: "flex", gap: "10px", justifyContent: "space-around" }}>
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

          <p>{error}</p>
          <InputTextareaComponent
            value={error ? error : output}
            onValueChanged={value => setOutput(value)}
            placeholder="Result JSON"
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

export default XmlToJsonPage;
