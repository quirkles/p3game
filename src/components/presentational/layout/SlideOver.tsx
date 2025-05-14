"use client";

import { PropsWithChildren, useState } from "react";
import styled from "styled-components";
import { FlexContainer } from "@/components/presentational/layout/FlexContainer";
import { StyledSpacer } from "@/components/presentational/layout/Spacer";
import { getColor } from "@/styles/colors";

const StyledSlideOver = styled.div<{
  $position: string;
  $isOpen: boolean;
}>`
  position: fixed;
  z-index: 100;
  background-color: ${getColor("white")};
  color: ${getColor("black")};
  transition: all 0.3s ease;
  ${({ $position, $isOpen }) => {
    switch ($position) {
      case "left":
        return `
          top: 0;
          bottom: 0;
          left: ${$isOpen ? "0" : "-80vw"};
          width: 80vw;
        `;
      case "right":
        return `
          top: 0;
          bottom: 0;
          width: 80vw;
          `;
    }
  }};
  .show-hide-toggle {
    display: flex;
    justify-content: center;
    align-items: center;
   cursor: pointer; 
   background-color: ${getColor("white")}; 
    position: absolute;
    padding: 1rem;
    font-weight: bold;
    height: 2rem;
    width: 2rem;
    ${({ $position }) => {
      switch ($position) {
        case "left":
          return `
            bottom: 2rem;
            right: -2rem;
          `;
      }
    }}
`;

interface SlideOverProps {
  position: string;
}

export function SlideOver({
  position,
  children,
}: PropsWithChildren<SlideOverProps>) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <StyledSlideOver $isOpen={isOpen} $position={position}>
      <StyledSpacer padding="2rem">{children}</StyledSpacer>
      <div className="show-hide-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "<" : ">"}
      </div>
    </StyledSlideOver>
  );
}
