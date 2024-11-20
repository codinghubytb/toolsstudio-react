import React from 'react';
import "./WrapperComponent.css";

const WrapperComponent = ({
  backgroundColor = "#fff",
  maxWidth = 690,
  paddingInPx = 30,
  isUseBoxShadow = true,
  children
}) => {
  const boxShadow = isUseBoxShadow 
    ? "0 10px 24px rgba(0, 0, 0, 0.08), 0 12px 16px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.03)"
    : "";

  return (
    <div
      className="ch-wrapper"
      style={{
        backgroundColor: backgroundColor,
        maxWidth: `${maxWidth}px`,
        padding: `${paddingInPx}px`,
        boxShadow: boxShadow
      }}
    >
      {children}
    </div>
  );
};

export default WrapperComponent;
