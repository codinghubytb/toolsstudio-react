import React from 'react';

const InputRangeComponent = ({
    value,
    onValueChanged,
    min = 0,
    max = 100,
    step = 1
}) => {

    const handleInputChange = (e) => {
        const newValue = e.target.value;
        if (onValueChanged) {
            onValueChanged(newValue);
        }
    };

    return (
        <input 
            type="range" 
            min={min} 
            max={max} 
            step={step} 
            value={value}  // Assurez-vous que 'value' est directement lié à l'état
            onChange={handleInputChange} 
        />
    );
};

export default InputRangeComponent;
