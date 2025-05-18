import styled from "styled-components";

type Dimension = `${number}${"px" | "%" | "em" | "rem" | "vw"}`;

interface SizeProps {
  $width?: Dimension;
  $maxWidth?: Dimension;
  $minWidth?: Dimension;
  $height?: Dimension;
  $maxHeight?: Dimension;
  $minHeight?: Dimension;
}

export const Size = styled.div<SizeProps>`
  width: ${({ $width }) => $width || "auto"};
  max-width: ${({ $maxWidth }) => $maxWidth || "none"};
  min-width: ${({ $minWidth }) => $minWidth || "none"};
  height: ${({ $height }) => $height || "auto"};
  max-height: ${({ $maxHeight }) => $maxHeight || "none"};
  min-height: ${({ $minHeight }) => $minHeight || "none"};
`;
