import React, { ChangeEvent } from "react";
import styled from "styled-components";
import { getColor } from "@/styles/colors";

// Define the type for individual options with Hungarian notation
interface ISelectOption {
  value: string | number;
  displayText: string;
}

// Define the props for our Select component with Hungarian notation
interface ISelectProps {
  options: ISelectOption[];
  selectedOptionId: string | number;
  onChange: (selectedOptionId: string | number) => void;
}

// Create styled components
const StyledSelect = styled.select`
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid ${getColor("grey3")};
  background-color: ${getColor("white")};
  font-size: 14px;
  cursor: pointer;
  min-width: 150px;

  &:hover {
    border-color: ${getColor("grey4")};
  }

  &:focus {
    border-color: ${getColor("blue")};
    outline: none;
  }
`;

const StyledOption = styled.option`
  padding: 8px;
`;

const Select: React.FC<ISelectProps> = ({
  options,
  selectedOptionId,
  onChange,
}) => {
  // Handler for when selection changes
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    // Convert to number if the original selectedOptionId is a number
    const parsedValue =
      typeof selectedOptionId === "number" ? Number(newValue) : newValue;
    onChange(parsedValue);
  };

  return (
    <StyledSelect value={selectedOptionId} onChange={handleChange}>
      {options.map((option) => (
        <StyledOption key={option.value} value={option.value}>
          {option.displayText}
        </StyledOption>
      ))}
    </StyledSelect>
  );
};

export default Select;
