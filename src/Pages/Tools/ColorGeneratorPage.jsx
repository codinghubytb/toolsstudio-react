import React, { useState } from "react";
import ButtonComponent from "../../Library/ButtonComponent";
import TitleComponent from "../../Library/TitleComponent";
import SpacerComponent from "../../Library/SpacerComponent";

const ColorGeneratorPage = () => {
  const [colors, setColors] = useState(generateColors());

  function generateColors() {
    return Array.from({ length: 8 }, () => `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`);
  }

  const refreshColors = () => {
    setColors(generateColors());
  };

  return (
    <div>
        <TitleComponent 
        text="Colors"
        isCenter="true"
      />
      <SpacerComponent />

        <ButtonComponent
         text="Refresh Palette"
         clickEvent={refreshColors} 
         backgroundColor="var(--primary-color)"
         borderColor="var(--primary-color)"
         textColor="white"/>

      <ul className="container-color">
        {colors.map((color, index) => (
          <li
            key={index}
            className="color"
            onClick={() => copyToClipboard(color)}
          >
            <div className="rect-box" style={{ backgroundColor: color }}></div>
            <span className="hex-value">{color}</span>
          </li>
        ))}
      </ul>

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
          width: 185px;
          height: 188px;
          border-radius: 4px;
        }

        .color:hover .rect-box {
          filter: brightness(107%);
        }

        .hex-value {
          display: block;
          color: #444;
          user-select: none;
          font-weight: 500;
          font-size: 1.15rem;
          margin: 12px 0 8px;
          text-transform: uppercase;
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

          .hex-value {
            font-size: 1.05rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ColorGeneratorPage;
