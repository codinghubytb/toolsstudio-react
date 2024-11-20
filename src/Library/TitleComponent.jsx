import React from 'react';
import "./TitleComponent.css";

const TitleComponent = ({
  fontSize = 24,
  text,
  textColor = "#000",
  isLineThrough = false,
  isCenter = true,
  isBold = true,
}) => {
  // Inline styles for the title based on props
  const titleStyles = {
    textAlign: isCenter ? "center" : "left",
    color: textColor,
    fontWeight: isBold ? "bold" : "initial",
    textDecoration: isLineThrough ? "line-through" : "none",
    fontSize: `${fontSize}px`,
    width: "100%",
  };

  return <p className="ch-title" style={titleStyles}>{text}</p>;
};

export default TitleComponent;
