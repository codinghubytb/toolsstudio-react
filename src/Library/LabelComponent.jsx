import React from 'react';

const Label = ({ text = "", textColor = "#000", clickEvent, id }) => {
  const handleClick = () => {
    if (clickEvent) {
      clickEvent();
    }
  };

  return (
    <label htmlFor={id} onClick={handleClick} style={{ color: textColor }}>
      {text}
    </label>
  );
};

export default Label;
