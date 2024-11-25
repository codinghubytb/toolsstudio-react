import React, { useState } from "react";
import InputFileComponent from "../../Library/InputFileComponent";
import PositionedComponent from "../../Library/PositionedComponent";
import WrapperComponent from "../../Library/WrapperComponent";
import LabelComponent from "../../Library/LabelComponent";
import ButtonComponent from "../../Library/ButtonComponent";
import SpacerComponent from "../../Library/SpacerComponent";
import TitleComponent from "../../Library/TitleComponent";
import InputNumberComponent from "../../Library/InputNumberComponent";
import InputCheckboxComponent from "../../Library/InputCheckboxComponent";

const ResizeImagePage = () => {
  const [file, setFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null); // Stores the Data URL
  const [error, setError] = useState("");
  const [heightDefault, setHeightDefault] = useState(null);
  const [widthDefault, setWidthDefault] = useState(null);
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const [isDefault, setIsDefault] = useState(true);
  const [isProportionnel, setIsProportionnel] = useState(true);
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
      const image = new Image();
      image.onload = () => {
        const { width, height } = image;
        setFile(selectedFile);
        setImageSrc(e.target.result);
        setWidthDefault(width);
        setHeightDefault(height);
        setWidth(width);
        setHeight(height);
        setError("");
      };
      image.onerror = () => {
        setError("Error loading the image.");
      };
      image.src = e.target.result; // Définit la source de l'image pour déclencher le chargement
    };
    reader.onerror = () => {
      setError("Error reading the file.");
    };
    reader.readAsDataURL(selectedFile); // Convertit le fichier en Data URL
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
  
    sendImageForResize(imageSrc, width, height, false, extension)
    .then(result => {
      console.log(result)
      if(result.error){
        setError(result.error);
      }
      else{
        const link = document.createElement("a");
        link.href = result.image
        link.download = `toolsstudio_resize-image.${extension}`;
        link.click();
      }
    })
    .catch(error => {
      setError('Error during image resize and download :', error);
    });
  };
  

  const sendImageForResize = async (base64Image, width, height, isCompression, extension) => {
    const endpoint = `/imagetransform/resize`;
    const apiUrl = import.meta.env.VITE_APIMODULE;
    try {
      // Create a FormData object to mimic MultipartFormDataContent
      const formData = new FormData();
  
      // Add the image file
      const imageBlob = base64ToBlob(base64Image, `image/${extension}`);
      formData.append("image", imageBlob, `image.${extension}`);
  
      // Add additional parameters
      formData.append("width", width.toString());
      formData.append("height", height.toString());
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
  

  const updateWidth = (value) => {
    if(value <0 )
    {
      setWidth(widthDefault);
      setHeight(heightDefault);
    }else{
      setWidth(value);

      const h = value * heightDefault / widthDefault;
      if(isProportionnel){
        setHeight(h);
      }
      
      if(Number(value) === widthDefault && Number(h) === heightDefault){
        setIsDefault(true);
      }else{
        setIsDefault(false);
      }
    }
  }

  const updateHeight = (value) => {
    console.log(value)
    if(value <0 )
    {
      setWidth(widthDefault);
      setHeight(heightDefault);
    }else{
      setHeight(value);
      const w = value * widthDefault / heightDefault;
      if(isProportionnel){
        setWidth(w);
      }

      if(Number(w) === widthDefault && Number(value) === heightDefault){
        setIsDefault(true);
      }else{
        setIsDefault(false);
      }
    }
  }

  const updateDefault = (value) => {
      setIsDefault(value);
      if(value){
        setWidth(widthDefault);
        setHeight(heightDefault);
      }
  }

  const updateProportionnel = (value) => {
    setIsProportionnel(value);
    if(value){
      setHeight(width * heightDefault / widthDefault);
    }
  }

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
                  <TitleComponent text="Resize Image" />
                  <SpacerComponent numberSpace={2} />

                  <div style={{display: "flex", width: "100%", gap: "10px"}}>
                    <InputCheckboxComponent 
                      label="Default ?"
                      value={isDefault}
                      disabled={true}
                     />
                     <InputCheckboxComponent 
                      label="Proportionnel ?"
                      value={isProportionnel}
                      onValueChanged={updateProportionnel}
                     />
                  </div>

                  <div style={{width: "100%"}}>
                    <LabelComponent text="Width" />
                    <SpacerComponent />
                    <div style={{display:"flex", width: "100%", alignItems: "end", gap: "10px"}}>
                      <InputNumberComponent
                        value={width}
                        onValueChanged={updateWidth}
                        min={1}
                        max={4000}
                      />
                      <LabelComponent text="px" />
                    </div>
                  </div>

                  <div style={{width: "100%"}}>
                    <LabelComponent text="Height" />
                    <SpacerComponent />
                    <div style={{display:"flex", width: "100%", alignItems: "end", gap: "10px"}}>
                      <InputNumberComponent
                        value={height}
                        onValueChanged={updateHeight}
                        min={1}
                        max={4000}
                      />
                      <LabelComponent text="px" />
                    </div>
                  </div>

                  <SpacerComponent />
                  <LabelComponent text={`${widthDefault} x ${heightDefault} -> ${width} x ${height}`} textColor="var(--text-color)" />

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

export default ResizeImagePage;
