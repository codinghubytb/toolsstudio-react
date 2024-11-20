import React, { useEffect, useState } from 'react';
import "./PositionedComponent.css";

const PositionedComponent = ({
  backgroundColor = "#fff",
  positionContent = "top-center",
  children
}) => {
  const [positionStyle, setPositionStyle] = useState('');

  useEffect(() => {
    const positionMap = {
      "top-left": "position-top-left",
      "top-center": "position-top-center",
      "top-right": "position-top-right",
      "center-left": "position-center-left",
      "center-center": "position-center-center",
      "center-right": "position-center-right",
      "bottom-left": "position-bottom-left",
      "bottom-center": "position-bottom-center",
      "bottom-right": "position-bottom-right",
      "full": "position-full", // Full position to take the whole viewport
    };

    setPositionStyle(positionMap[positionContent.toLowerCase()] || "position-center-center");
  }, [positionContent]);

  return (
    <div
      className={`ch-position ${positionStyle}`}
      style={{
        backgroundColor: backgroundColor
      }}
    >
      {children}
    </div>
  );
};

export default PositionedComponent;
