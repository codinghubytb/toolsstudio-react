import React, { useState } from "react";
import InputFileComponent from "../../Library/InputFileComponent";
import PositionedComponent from "../../Library/PositionedComponent";
import WrapperComponent from "../../Library/WrapperComponent";
import LabelComponent from "../../Library/LabelComponent";
import ButtonComponent from "../../Library/ButtonComponent";
import SpacerComponent from "../../Library/SpacerComponent";
import TitleComponent from "../../Library/TitleComponent";
import InputNumberComponent from "../../Library/InputNumberComponent";

const RotateImagePage = () => {
  const [file, setFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null); // Stores the Data URL
  const [error, setError] = useState("");
  const [angle, setAngle] = useState(10);
  const maxFileSize = 1024 * 100; // 100 KB

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      setError("No file selected.");
      return;
    }

    if (selectedFile.size > maxFileSize) {
      setError("The file is too large. Please select a file less than 100 KB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setFile(selectedFile);
      setImageSrc(e.target.result); // Set Data URL for preview
      setError("");
    };
    reader.onerror = () => {
      setError("Error reading the file.");
    };
    reader.readAsDataURL(selectedFile); // Convert file to Data URL
  };

  const download = async () => {
    if (!imageSrc) return;
  
    // Extract extension from Base64 string or URL
    let extension = "png"; // Default extension
    const base64HeaderMatch = imageSrc.match(/^data:image\/(\w+);base64,/);
  
    if (base64HeaderMatch && base64HeaderMatch[1]) {
      extension = base64HeaderMatch[1];
    } else {
      console.error("Unable to determine file extension. Using default: png.");
    }
  
    sendImageForRotate(imageSrc, angle, false, extension)
    .then(result => {
      const link = document.createElement("a");
      link.href = result.image
      link.download = `toolsstudio_rotated-image.${extension}`;
      link.click();
    })
    .catch(error => {
      setError('Error during image rotation and download :', error);
    });
  };
  

  const sendImageForRotate = async (base64Image, angle, isCompression, extension) => {
    const endpoint = `/imagetransform/rotate`;
    const apiUrl = import.meta.env.VITE_APIMODULE;
    try {
      // Create a FormData object to mimic MultipartFormDataContent
      const formData = new FormData();
  
      // Add the image file
      const imageBlob = base64ToBlob(base64Image, `image/${extension}`);
      formData.append("image", imageBlob, `image.${extension}`);
  
      // Add additional parameters
      formData.append("angle", angle.toString());
      formData.append("iscompression", isCompression.toString());
  
      // Make the POST request
      const response = await fetch(`${apiUrl}${endpoint}`, {
        method: "POST",
        body: formData,
      });
  
      // Check if the response is OK
      if (response.ok) {
        const result = await response.json();
        return result; // Assuming the API returns a JSON object
      } else {
        throw new Error("Error: Loading Image Transform");
      }
    } catch (error) {
      console.error(error);
      return { error: "Error: Loading Image Transform" };
    }
  };
  
  // Utility function to convert Base64 to Blob
  const base64ToBlob = (base64, contentType) => {
    // Supprimer le préfixe Base64 s'il existe
    const base64Cleaned = base64.replace(/^data:image\/\w+;base64,/, "");
  
    try {
      const byteCharacters = atob(base64Cleaned);
      const byteArrays = [];
  
      for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);
  
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
  
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }
  
      return new Blob(byteArrays, { type: contentType });
    } catch (error) {
      console.error("Base64 decoding failed:", error);
      throw new Error("Invalid Base64 string");
    }
  };
  
  

  const reset = () => {
    setFile(null);
    setImageSrc(null);
    setError("");
  };

  return (
    <>
      <style>
        {`
          .flex-container {
            display: flex;
            gap: 10px;
            height: 100%;
            flex-direction: row;
          }
          @media (max-width: 768px) {
            .flex-container {
              flex-direction: column;
            }
          }
        `}
      </style>

      {imageSrc ? (
        <div className="flex-container">
          <WrapperComponent backgroundColor="lightgray" isUseBoxShadow={false}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <img
                src={imageSrc}
                alt="Uploaded"
                style={{
                  width: "50%",
                  height: "50%",
                  transform: `rotate(${angle}deg)`,
                  objectFit: "contain",
                }}
              />
            </div>
          </WrapperComponent>

          <PositionedComponent
            backgroundColor="transparent"
            positionContent="full"
          >
            <WrapperComponent>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <div>
                  <TitleComponent text="Rotate Image" />
                  <SpacerComponent numberSpace={2} />

                  <LabelComponent text="Angle of Rotation (deg)" />
                  <SpacerComponent />
                  <InputNumberComponent
                    value={angle}
                    onValueChanged={(value) => setAngle(value)}
                    max={360}
                    min={-360}
                  />
                </div>
                <div>
                  <ButtonComponent
                    text="Reset"
                    backgroundColor="black"
                    textColor="#fff"
                    clickEvent={reset}
                  />
                  <SpacerComponent numberSpace={2} />
                  <ButtonComponent
                    text="Download"
                    backgroundColor="var(--primary-color)"
                    textColor="#fff"
                    clickEvent={download}
                  />
                </div>
              </div>
            </WrapperComponent>
          </PositionedComponent>
        </div>
      ) : (
        <>
          <InputFileComponent onFileChange={handleFileChange} />
          {error && <p style={{ color: "red" }}>{error}</p>}
        </>
      )}
    </>
  );
};

export default RotateImagePage;