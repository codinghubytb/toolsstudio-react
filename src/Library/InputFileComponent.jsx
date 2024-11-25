import React, { useState } from "react";
import "./InputFileComponent.css";

const InputFileComponent = ({
  acceptedFileTypes = "image/*, text/*",
  maxSize = 1024 * 100, 
  textColor = "#000",
  onFileChange,
  id,
}) => {
  const [error, setError] = useState("");
  const [isFileSelected, setIsFileSelected] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0]; // Récupérer le fichier
    setError(""); // Réinitialiser l'erreur

    if (!file) {
      setError("No file selected.");
      return;
    }

    if (file.size > maxSize) {
      setError("File size exceeds 100 KB. Please select a smaller file.");
      return;
    }

    setIsFileSelected(true);

    // Appeler la fonction de rappel avec le fichier sélectionné
    if (onFileChange) {
      onFileChange(event);
    }
  };

  return (
    <label
      htmlFor={id}
      className={`ch-drop-container ${isFileSelected ? "ch-file-selected" : ""}`}
    >
      <span className="ch-drop-title" style={{ color: textColor }}>
        Drop files here or click to select
      </span>
      <input
        type="file"
        id={id}
        className="ch-drop-input"
        accept={acceptedFileTypes}
        onChange={handleFileUpload}
      />
      {error && <p style={{ color: "red", fontSize: "12px" }}>{error}</p>}
    </label>
  );
};

export default InputFileComponent;
