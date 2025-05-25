import styled from "styled-components";
import { ColorName, getColor } from "@/styles/colors";

export const P = styled.p<{
  $elevation?: 1 | 2 | 3 | 4 | 5;
  $width?: string;
  $height?: string;
  $padding?: string;
  $margin?: string;
  $borderRadius?: string;
  $backgroundColor?: ColorName;
  $color?: ColorName;
  $hover?: boolean;
}>`
  color: ${({ $color }) => $color};
  width: ${({ $width }) => $width || "auto"};
  height: ${({ $height }) => $height || "auto"};
  padding: ${({ $padding }) => $padding || "1rem"};
  margin: ${({ $margin }) => $margin || "0"};
  border-radius: ${({ $borderRadius }) => $borderRadius || "4px"};
  background-color: ${({ $backgroundColor }) =>
    $backgroundColor ? getColor($backgroundColor) : getColor("white")};
`;
