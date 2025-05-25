import styled from "styled-components";

export const FlexContainer = styled.div<{
  $justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  $alignItems?: "stretch" | "flex-start" | "flex-end" | "center" | "baseline";
  $flexDirection?: "row" | "row-reverse" | "column" | "column-reverse";
  $gap?: `${number}px` | `${number}rem` | `${number}em` | "0";
}>`
  display: flex;
  justify-content: ${({ $justifyContent }) => $justifyContent || "flex-start"};
  align-items: ${({ $alignItems }) => $alignItems || "stretch"};
  flex-direction: ${({ $flexDirection }) => $flexDirection || "row"};
  gap: ${({ $gap }) => $gap || "0"};
`;

export const FlexChild = styled.div<{
  $flex?:
    | "none"
    | `${number} ${number} ${string}`
    | "auto"
    | "initial"
    | "inherit";
  $alignSelf?:
    | "auto"
    | "flex-start"
    | "flex-end"
    | "center"
    | "baseline"
    | "stretch";
  $order?: number;
  $grow?: number;
  $shrink?: number;
}>`
  flex-grow: ${({ $grow }) => $grow};
  flex-shrink: ${({ $shrink }) => $shrink};
  flex: ${({ $flex }) => $flex};
  align-self: ${({ $alignSelf }) => $alignSelf || "auto"};
  order: ${({ $order }) => $order || 0};
`;
