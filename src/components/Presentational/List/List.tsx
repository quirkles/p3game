import styled from "styled-components";
import { noop } from "@/utils/func";
import { lightenDarkenColor, getColor } from "@/styles/colors";

const StyledList = styled.ul<{
  $clickable?: boolean;
}>`
  cursor: ${({ $clickable }) => ($clickable ? "pointer" : "default")};
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    padding: 1rem 0.5rem;
    background-color: ${getColor("lightBlue")};
    &:hover {
      background-color: ${lightenDarkenColor(getColor("lightBlue"), -20)};
    }
    &:nth-child(even) {
      background-color: ${getColor("white")};
      &:hover {
        background-color: ${getColor("grey1")};
      }
    }
  }
`;

interface ListProps {
  items: {
    display: string;
    key: string;
  }[];
  onClick?: (itemKey: string) => void;
}

export function List({ items, onClick }: ListProps) {
  const handler = onClick || noop;
  return (
    <StyledList $clickable={!!onClick}>
      {items.map(({ display, key }) => (
        <li key={key} onClick={() => handler(key)}>
          {display}
        </li>
      ))}
    </StyledList>
  );
}
