import styled from "styled-components";
import { noop } from "@/utils/func";

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    padding: 0.5rem 0;
  }
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
