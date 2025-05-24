import styled from "styled-components";
import { getColor } from "@/styles/colors";

export const Input = styled.input<{
  $hasError?: boolean;
}>`
  padding: 12px 16px;
  font-size: 14px;
  background-color: ${getColor("white")};
  color: ${getColor("black")};
  border: none;
  border-bottom: 2px solid
    ${({ $hasError }) => getColor($hasError ? "red" : "grey1")};
  outline: none;
  width: 100%;
  box-sizing: border-box;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    border-color: #b3b3b3;
  }

  &:focus {
    border-color: ${getColor("blue")};
  }

  &:disabled {
    background-color: ${getColor("grey2")};
    border-color: ${getColor("grey4")};
    cursor: not-allowed;
    color: ${getColor("black")};
  }
`;
