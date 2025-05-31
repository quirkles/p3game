import styled, { css } from "styled-components";
import {
  ColorName,
  HexString,
  lightenDarkenColor,
  getColor,
  getFontColor,
} from "@/styles/colors";

// Create a type that ensures only one of the props is provided (not both)
type ButtonColorProps = {
  disabled?: boolean;
  $size?: "small" | "medium" | "large";
} & (
  | { color: ColorName; $variant?: never }
  | { color?: never; $variant: ColorName }
  | { color?: never; $variant?: never }
); // Allow both to be omitted for default

export const Button = styled.button<ButtonColorProps>`
  ${({ color, $variant, disabled }) => {
    // Use color if provided, otherwise use variant, default to blue
    const colorName = color || $variant || "blue";
    let backgroundColor: HexString;

    try {
      backgroundColor = disabled ? getColor("grey2") : getColor(colorName);
    } catch (e) {
      console.warn(`Invalid color name: ${colorName}. Using default blue.`, e);
      backgroundColor = getColor("blue");
    }

    const textColor = getFontColor(colorName);

    return css`
      background-color: ${backgroundColor};
      color: ${textColor};
      &:hover {
        background-color: ${lightenDarkenColor(
          backgroundColor as `#${string}`,
          -40,
        )};
      }

      &:active {
        background-color: ${lightenDarkenColor(
          backgroundColor as `#${string}`,
          -40,
        )};
      }
    `;
  }}

  font-size: ${({ $size }) => {
    switch ($size) {
      case "small":
        return "12px";
      case "large":
        return "20px";
      case "medium":
      default:
        return "16px";
    }
  }};
  padding: ${({ $size }) => {
    switch ($size) {
      case "small":
        return "4px 10px";
      case "large":
        return "10px 25px";
      case "medium":
      default:
        return "6px 15px";
    }
  }};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;
`;
