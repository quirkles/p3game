"use client"

import React, { useState } from "react";
import styled from "styled-components";
import {getColor} from "@/styles/colors";

// Define the position types
type Position = "top" | "left" | "bottom" | "right";

interface SlideOverProps {
  position: Position;
  tabContent: React.ReactNode;
  children: React.ReactNode;
}

function SlideOver({ position, tabContent, children }: SlideOverProps) {
  const [isOpen, setIsOpen] = useState(true);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SlideOverContainer position={position}>
      <Tab position={position} $isOpen={isOpen} onClick={togglePanel}>
        {tabContent}
      </Tab>
      <Panel position={position} $isOpen={isOpen}>
        {children}
      </Panel>
    </SlideOverContainer>
  );
}

// Styled components for the SlideOver
interface PositionProps {
  position: Position;
  $isOpen?: boolean;
}

interface PanelProps extends PositionProps {
  $isOpen: boolean;
}

const SlideOverContainer = styled.div<PositionProps>`
  position: fixed;
  ${({ position }) => {
    switch (position) {
      case "top":
        return "top: 0; left: 0; right: 0;";
      case "left":
        return "left: 0; top: 0; bottom: 0;";
      case "bottom":
        return "bottom: 0; left: 0; right: 0;";
      case "right":
        return "right: 0; top: 0; bottom: 0;";
    }
  }}
  z-index: 1000;
`;

const Panel = styled.div<PanelProps>`
  background-color: ${getColor("white")};
  transition: transform 0.3s ease;
  overflow: auto;

  ${({ position, $isOpen }) => {
    const size = position === "left" || position === "right" ? "80vw" : "80vh";

    switch (position) {
      case "top":
        return `
          height: ${size};
          width: 100%;
          transform: translateY(${$isOpen ? "0" : "-100%"});
        `;
      case "left":
        return `
          width: ${size};
          height: 100%;
          transform: translateX(${$isOpen ? "0" : "-100%"});
          border-right: ${`1px solid ${getColor("red")};`}
        `;
      case "bottom":
        return `
          height: ${size};
          width: 100%;
          transform: translateY(${$isOpen ? "0" : "100%"});
        `;
      case "right":
        return `
          width: ${size};
          height: 100%;
          transform: translateX(${$isOpen ? "0" : "100%"});
        `;
    }
  }}
`;

const Tab = styled.div<PositionProps>`
  position: fixed;
  background-color: ${getColor("white")};
  border: 2px solid ${getColor("red")};
  color: ${getColor("red")};
  cursor: pointer;
  z-index: 1001;
  padding: 10px;

  ${({ position, $isOpen }) => {
    switch (position) {
      case "top":
        return `
          bottom: -40px;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 0 0 5px 5px;
        `;
      case "left":
        return `
          left: -2px;
          bottom: 0;
          transform: translateY(-50%) translateX(${$isOpen ? "80vw" : 0});;
          border-radius: 0 5px 5px 0;
          border-left: none;
        `;
      case "bottom":
        return `
          top: -40px;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 5px 5px 0 0;
        `;
      case "right":
        return `
          left: -40px;
          top: 50%;
          transform: translateY(-50%);
          border-radius: 5px 0 0 5px;
        `;
    }
  }}
`;

export default SlideOver;
