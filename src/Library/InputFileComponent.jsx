import React, { useState } from "react";
import "./InputFileComponent.css"

const InputFileComponent = ({ acceptedFileTypes = "image/*", textColor = "#000", onFileChange }) => {
    const [isFileSelected, setIsFileSelected] = useState(false);

    const handleFileUpload = (event) => {
        const files = event.target.files;
        setIsFileSelected(files.length > 0);

        // Appeler la fonction de rappel lorsque les fichiers sont sélectionnés
        if (onFileChange) {
            onFileChange(files);
        }
    };

    return (
        <label
            htmlFor="file-upload"
            className={`ch-drop-container ${isFileSelected ? "ch-file-selected" : ""}`}
            id="dropcontainer"
        >
            <span className="ch-drop-title" style={{ color: textColor }}>
                Drop files here
            </span>
            or
            <input
                type="file"
                id="file-upload"
                className="ch-drop-input"
                accept={acceptedFileTypes}
                onChange={handleFileUpload}
            />
        </label>
    );
};

export default InputFileComponent;
