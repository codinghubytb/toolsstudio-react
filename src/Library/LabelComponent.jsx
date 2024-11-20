import React from 'react';

const Label = ({ text = "", textColor = "#000", clickEvent }) => {
  const handleClick = () => {
    if (clickEvent) {
      clickEvent();
    }
  };

  return (
    <label onClick={handleClick} style={{ color: textColor }}>
      {text}
    </label>
  );
};

export default Label;
