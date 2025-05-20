import styled, { css } from "styled-components";
import {
  ColorName,
  HexString,
  darkenColor,
  getColor,
  getFontColor,
} from "@/styles/colors";

// Create a type that ensures only one of the props is provided (not both)
type ButtonColorProps = {
  $size?: "small" | "medium" | "large";
} & (
  | { color: ColorName; variant?: never }
  | { color?: never; variant: ColorName }
  | { color?: never; variant?: never }
); // Allow both to be omitted for default

export const Button = styled.button<ButtonColorProps>`
  ${({ color, variant }) => {
    // Use color if provided, otherwise use variant, default to blue
    const colorName = color || variant || "blue";
    let backgroundColor: HexString;

    try {
      backgroundColor = getColor(colorName);
    } catch (e) {
      console.warn(`Invalid color name: ${colorName}. Using default blue.`, e);
      backgroundColor = getColor("blue");
    }

    const textColor = getFontColor(colorName);

    return css`
      background-color: ${backgroundColor};
      color: ${textColor};
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

  &:hover {
    background-color: ${({ color, variant }) => {
      const colorName = color || variant || "blue";
      let backgroundColor: string;

      try {
        backgroundColor = getColor(colorName);
      } catch (e) {
        console.error(
          `Invalid color name: ${colorName}. Using default blue.`,
          e,
        );
        backgroundColor = getColor("blue");
      }

      return darkenColor(backgroundColor as `#${string}`, 40);
    }};
  }

  &:active {
    background-color: ${({ color, variant }) => {
      const colorName = color || variant || "blue";
      let backgroundColor: string;

      try {
        backgroundColor = getColor(colorName);
      } catch (e) {
        console.error(
          "invalid color name: ${colorName}. Using default blue.",
          e,
        );
        backgroundColor = getColor("blue");
      }

      return darkenColor(backgroundColor as `#${string}`, 75);
    }};
  }
`;
