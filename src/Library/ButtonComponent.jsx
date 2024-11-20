import React from 'react';
import "./ButtonComponent.css";

const ButtonComponent = ({
  text,
  icon,
  heightIcon = 24,
  widthIcon = 24,
  clickEvent,
  backgroundColor = "#fff",
  borderColor = "transparent",
  backgroundColorImage = "#fff",
  textColor = "#000",
  active = false,
  width = "100%",
}) => {
  // Handle the click event if a delegate (event handler) is provided
  const handleClick = (e) => {
    if (clickEvent) {
      clickEvent();
    }
    e.stopPropagation(); // Prevent event propagation
  };

  return (
    <button
      className={`ch-btn ${active ? "active" : ""}`}
      style={{
        width: width,
        backgroundColor: backgroundColor,
        color: textColor,
        borderColor: borderColor,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={handleClick}
    >
      {icon && (
        <img
          style={{ backgroundColor: backgroundColorImage }}
          src={icon}
          width={widthIcon}
          height={heightIcon}
          alt=""
        />
      )}
      {text}
    </button>
  );
};

export default ButtonComponent;
