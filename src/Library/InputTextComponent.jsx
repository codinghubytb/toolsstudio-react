import React from 'react';
import "./InputTextComponent.css";

const InputTextComponent = ({
    value,
    onValueChanged,
    placeholder = '',
    textColor = '#000',
    fontSize = 18,
    backgroundColor = 'transparent',
    borderColor = '#ccc',
    maxlength = 1000,
    disabled = false,
    isPassword = false
}) => {
    // Handle input change
    const handleInputChange = (e) => {
        const newValue = e.target.value;
        if (onValueChanged) {
            onValueChanged(newValue); // Immediately pass the updated value to parent
        }
    };

    return (
        <div className="ch-text-input" style={{ borderColor: borderColor }}>
            <input
                type={isPassword ? 'password' : 'text'}
                value={value}  // Use the value prop directly
                onInput={handleInputChange}  // Triggered immediately when the user types
                maxLength={maxlength}
                placeholder={placeholder}
                disabled={disabled}
                className="ch-input"
                style={{
                    color: textColor,
                    backgroundColor: backgroundColor,
                    fontSize: `${fontSize}px`,
                }}
            />
        </div>
    );
};

export default InputTextComponent;
