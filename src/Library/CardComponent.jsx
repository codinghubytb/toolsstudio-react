import React from "react";
import PropTypes from "prop-types";
import "./CardComponent.css";

const CardComponent = ({
    itemTemplate,
    icon,
    title,
    maxWidth = "100%",
    subTitle,
    backgroundColor = "#eee",
    textColor = "#000",
    backgroundColorIndicator = "#eee",
    textColorIndicator = "#000",
    borderColorIndicator = "transparent",
    indication,
}) => {
    return (
        <div
            className="ch-cards-inner"
            style={{ backgroundColor: backgroundColor, maxWidth: maxWidth  }}
        >
            {indication && (
                <div
                    className="ch-indication"
                    style={{
                        backgroundColor: backgroundColorIndicator,
                        color: textColorIndicator,
                        border: `1px solid ${borderColorIndicator}`,
                    }}
                >
                    {indication}
                </div>
            )}

            {icon && (
                <div className="ch-element-icon">
                    <img src={icon} alt="icon" loading="lazy" />
                </div>
            )}

            {/* Card content */}
            <div className="ch-cards-element">
                <h4 style={{
                        color: textColor
                    }}>{title}</h4>
                <small style={{
                        color: textColor
                    }}>{subTitle}</small>
                <div className="ch-element-body" style={{
                        color: textColor
                    }}>{itemTemplate}</div>
            </div>
        </div>
    );
};

CardComponent.propTypes = {
    itemTemplate: PropTypes.node,
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string,
    backgroundColor: PropTypes.string,
    backgroundColorIndicator: PropTypes.string,
    textColorIndicator: PropTypes.string,
    borderColorIndicator: PropTypes.string,
    indication: PropTypes.string,
};

export default CardComponent;
