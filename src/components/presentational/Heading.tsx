"use client";

import React, { PropsWithChildren } from "react";
import styled from "styled-components";

type HeadingProps = PropsWithChildren<{
  $level?: 1 | 2 | 3 | 4 | 5 | 6; // Heading level (h1-h6)
  $color?: string; // Text color
  $fontSize?: string; // Font size
  $alignment?: "left" | "center" | "right"; // Text alignment
}>;

// Define a styled component that adapts to its props
const StyledHeading = styled.div<HeadingProps>`
  color: ${({ color }) => color || "inherit"};
  font-size: ${({ $fontSize }) => $fontSize || "inherit"};
  text-align: ${({ $alignment }) => $alignment || "left"};
  margin: 0;
`;

// Heading functional component
const Heading: React.FC<HeadingProps> = ({
  $level = 1,
  $color,
  $fontSize,
  $alignment = "left",
  children,
}) => {
  const HeadingTag = `h${$level}`;

  return (
    <StyledHeading
      as={HeadingTag}
      $color={$color}
      $fontSize={$fontSize}
      $alignment={$alignment}
    >
      {children}
    </StyledHeading>
  );
};

export default Heading;
