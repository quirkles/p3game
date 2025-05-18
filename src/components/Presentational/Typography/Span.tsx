import styled from "styled-components";

interface SpanProps {
  $color?: string;
  $fontSize?: string;
  $alignment?: "left" | "center" | "right";
  $fontWeight?: "normal" | "bold";
}

export const Span = styled.span<SpanProps>`
  color: ${({ $color }) => $color || "inherit"};
  font-size: ${({ $fontSize }) => $fontSize || "inherit"};
  text-align: ${({ $alignment }) => $alignment || "left"};
  font-weight: ${({ $fontWeight }) => $fontWeight || "normal"};
`;
