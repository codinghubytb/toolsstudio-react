import React from "react";
import PropTypes from "prop-types";

const GridComponent = ({
  items,
  itemTemplate,
  emptyResults,
  columnsXXL = 1,
  columnsXL = 1,
  columnsLG = 1,
  columnsMD = 1,
  columnsSM = 1,
  columnsXSM = 1,
  gap = 40,
}) => {
  const renderEmptyResults = () => {
    if (emptyResults) {
      return emptyResults;
    } else {
      return (
        <h4>Oops, no results found.</h4>
      );
    }
  };

  const mediaWidthStyle = `
    .cards {
      display: grid;
      gap: ${gap}px;
    }

    @media (max-width: 576px) {
      .cards {
        grid-template-columns: repeat(${columnsXSM}, 1fr);
      }
    }
    @media (min-width: 576px) {
      .cards {
        grid-template-columns: repeat(${columnsSM}, 1fr);
      }
    }
    @media (min-width: 768px) {
      .cards {
        grid-template-columns: repeat(${columnsMD}, 1fr);
      }
    }
    @media (min-width: 992px) {
      .cards {
        grid-template-columns: repeat(${columnsLG}, 1fr);
      }
    }
    @media (min-width: 1200px) {
      .cards {
        grid-template-columns: repeat(${columnsXL}, 1fr);
      }
    }
    @media (min-width: 1400px) {
      .cards {
        grid-template-columns: repeat(${columnsXXL}, 1fr);
      }
    }
  `;

  return (
    <div>
      <style>{mediaWidthStyle}</style>
      {(!items || items.length === 0) ? (
        renderEmptyResults()
      ) : (
        <div className="cards">
          {items.map((item, index) => (
            <React.Fragment key={index}>{itemTemplate(item)}</React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

GridComponent.propTypes = {
  items: PropTypes.array.isRequired, // Array of items to display.
  itemTemplate: PropTypes.func.isRequired, // Function to render each item.
  emptyResults: PropTypes.element, // Element to render if there are no items.
  iconNoResult: PropTypes.string, // Icon for the no results component.
  columnsXXL: PropTypes.number, // Number of columns for XXL screens.
  columnsXL: PropTypes.number, // Number of columns for XL screens.
  columnsLG: PropTypes.number, // Number of columns for LG screens.
  columnsMD: PropTypes.number, // Number of columns for MD screens.
  columnsSM: PropTypes.number, // Number of columns for SM screens.
  columnsXSM: PropTypes.number, // Number of columns for XSM screens.
  gap: PropTypes.number, // Gap between grid items.
};

export default GridComponent;
