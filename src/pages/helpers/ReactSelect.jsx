import React from "react";
import Select from "react-select";
const ReactSelect = ({
  options,
  handleChange,
  placeHolder,
  selectedOption,
}) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? "theme-focused-background"
        : "theme-default-background",
      borderColor: state.isFocused
        ? "theme-focused-border"
        : "theme-default-border",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "white",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "theme-option-background"
        : "theme-selected-background",
      color: "black",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "theme-single-value-text",
    }),
    input: (provided) => ({
      ...provided,
      color: "theme-search-text-color",
    }),
  };
  return (
    <div>
      <Select
        options={options}
        placeholder={placeHolder}
        defaultValue={selectedOption}
        isSearchable={true}
        styles={customStyles}
        onChange={handleChange}
      />
    </div>
  );
};

export default ReactSelect;
