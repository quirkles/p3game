"use client";

import { PropsWithChildren, useState } from "react";
import styled from "styled-components";
import { Spacer } from "@/components/Presentational/Layout/Spacer";
import { getColor } from "@/styles/colors";

const StyledSlideOver = styled.div<{
  $position: string;
  $isOpen: boolean;
}>`
    position: fixed;
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

    .content,.show-hide-toggle {
        z-index: 100;
    }
    
    .content {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }


    .overlay {
        cursor: pointer;   
        position: absolute;
        top: 0;
        bottom: 0;
        right: -20vw;
        width: 20vw;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 90;
        ${({ $isOpen }) => `
      ${$isOpen ? "display: block;" : "display: none;"};
    `}
    }

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
      <Spacer className="content" $padding="2rem">
        {children}
      </Spacer>
      <div className="show-hide-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "<" : ">"}
      </div>
      <div className="overlay" onClick={() => setIsOpen(false)} />
    </StyledSlideOver>
  );
}
