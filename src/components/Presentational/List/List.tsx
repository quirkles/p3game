import styled from "styled-components";
import { noop } from "@/utils/func";

const StyledList = styled.ul`
  list-style: none;
`;

interface ListProps {
  items: {
    display: string;
    key: string;
  }[];
  onClick?: (itemKey: string) => void;
}

export function List({ items, onClick = noop }: ListProps) {
  return (
    <StyledList>
      {items.map(({ display, key }) => (
        <li key={key} onClick={() => onClick(key)}>
          {display}
        </li>
      ))}
    </StyledList>
  );
}
