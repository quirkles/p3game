"use client";

import React, { PropsWithChildren } from "react";
import styled from "styled-components";

type HeadingProps = PropsWithChildren<{
  $level?: 1 | 2 | 3 | 4 | 5 | 6; // Heading level (h1-h6)
  $color?: string; // Text color
  $fontSize?: string; // Font size
  $alignment?: "left" | "center" | "right"; // Text alignment
  $fontWeight?: "normal" | "bold";
  $textTransform?: "uppercase" | "lowercase" | "capitalize";
  $textDecoration?: "underline" | "line-through" | "none";
}>;

// Define a styled component that adapts to its props
const StyledHeading = styled.div<HeadingProps>`
  color: ${({ color }) => color};
  font-size: ${({ $fontSize }) => $fontSize};
  text-align: ${({ $alignment }) => $alignment || "left"};
  margin: 0;
  font-weight: ${({ $fontWeight }) => $fontWeight};
  text-transform: ${({ $textTransform }) => $textTransform};
  text-decoration: ${({ $textDecoration }) => $textDecoration};
`;

// Heading functional component
export function Heading({
  $level = 1,
  $color,
  $fontSize,
  $alignment = "left",
  $textTransform,
  $textDecoration,
  $fontWeight,
  children,
}: HeadingProps) {
  const HeadingTag = `h${$level}`;

  return (
    <StyledHeading
      as={HeadingTag}
      $color={$color}
      $fontSize={$fontSize}
      $alignment={$alignment}
      $textTransform={$textTransform}
      $textDecoration={$textDecoration}
      $fontWeight={$fontWeight}
    >
      {children}
    </StyledHeading>
  );
}
