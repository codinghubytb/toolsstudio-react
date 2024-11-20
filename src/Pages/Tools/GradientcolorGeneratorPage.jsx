import React, { useState } from "react";
import ButtonComponent from "../../Library/ButtonComponent";
import TitleComponent from "../../Library/TitleComponent";
import SpacerComponent from "../../Library/SpacerComponent";

const GradientColorGeneratorPage = () => {
  // Génère une palette de dégradés
  const [colors, setColors] = useState(generateColors());

  function generateColors() {
    return Array.from({ length: 8 }, () => 
      `linear-gradient(90deg, #${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")} 0%, #${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")} 100%)`
    );
  }

  // Rafraîchit la palette
  const refreshColors = () => {
    setColors(generateColors());
  };

  // Copie le code du dégradé dans le presse-papiers
  const copyToClipboard = (color) => {
    navigator.clipboard.writeText(color).then(() => {
      alert("Gradient copied: " + color);
    });
  };

  return (
    <div>
      <TitleComponent 
        text="Gradient Color"
        isCenter="true"
      />
      <SpacerComponent />
      <ButtonComponent
        isCenter="true"
        text="Refresh Palette"
        clickEvent={refreshColors}
        backgroundColor="var(--primary-color)"
        borderColor="var(--primary-color)"
        textColor="white"
      />

      {/* Liste des couleurs en dégradé */}
      <ul className="container-color">
        {colors.map((color, index) => (
          <li key={index} className="color" onClick={() => copyToClipboard(color)}>
            <div className="rect-box" style={{ background: color }}></div>
          </li>
        ))}
      </ul>

      {/* Styles */}
      <style>{`
        .container-color {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
        }

        .color {
          margin: 12px;
          padding: 7px;
          list-style: none;
          cursor: pointer;
          text-align: center;
          background: #fff;
          border-radius: 6px;
          box-shadow: 0 10px 25px rgba(52, 87, 220, 0.08);
          transition: all 0.3s ease;
        }

        .color:active {
          transform: scale(0.95);
        }

        .rect-box {
          width: 300px;
          height: 188px;
          border-radius: 4px;
        }

        .color:hover .rect-box {
          filter: brightness(107%);
        }

        @media screen and (max-width: 500px) {
          .container-color {
            margin: 10px;
          }

          .color {
            margin: 8px;
            padding: 5px;
            width: calc(100% / 2 - 20px);
          }

          .rect-box {
            width: 100%;
            height: 148px;
          }
        }
      `}</style>
    </div>
  );
};

export default GradientColorGeneratorPage;
