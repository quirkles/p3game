import styled from "styled-components";

type sizeStr = `${number}${"vw" | "vh" | "px" | "em" | "rem" | "%"}`;

interface SpacerProps {
  padding?: sizeStr;
  paddingTop?: sizeStr;
  paddingBottom?: sizeStr;
  paddingLeft?: sizeStr;
  paddingRight?: sizeStr;
  paddingX?: sizeStr;
  paddingY?: sizeStr;
  margin?: sizeStr;
  marginTop?: sizeStr;
  marginBottom?: sizeStr;
  marginLeft?: sizeStr;
  marginRight?: sizeStr;
  marginX?: sizeStr;
  marginY?: sizeStr;
}

export const StyledSpacer = styled.div<SpacerProps>`
  ${({
    padding,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingX,
    paddingY,
    margin,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    marginX,
    marginY,
  }) => `
        padding-top: ${paddingTop || padding || paddingY || "0"};
        padding-bottom: ${paddingBottom || padding || paddingY || "0"};
        padding-left: ${paddingLeft || padding || paddingX || "0"};
        padding-right: ${paddingRight || padding || paddingX || "0"};
        margin-top: ${marginTop || margin || marginY || "0"};
        margin-bottom: ${marginBottom || margin || marginY || "0"};
        margin-left: ${marginLeft || margin || marginX || "0"};
        margin-right: ${marginRight || margin || marginX || "0"};
    `}
`;
