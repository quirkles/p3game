import styled from "styled-components";
import { noop } from "@/utils/func";
import { lightenDarkenColor, getColor } from "@/styles/colors";
import {
  FlexChild,
  FlexContainer,
} from "@/components/Presentational/Layout/FlexContainer";
import { CheckBox } from "@/components/Presentational/Form/CheckBox";

const StyledList = styled.ul<{
  $clickable?: boolean;
}>`
  cursor: ${({ $clickable }) => ($clickable ? "pointer" : "default")};
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    padding: 0.5rem 0.25rem;
    background-color: ${getColor("lightBlue")};
    &:hover {
      background-color: ${lightenDarkenColor(getColor("lightBlue"), -20)};
    }
    &:nth-child(odd) {
      background-color: ${getColor("white")};
      &:hover {
        background-color: ${getColor("grey1")};
      }
    }
  }
`;

type ListProps<T extends boolean> = {
  areItemsSelectable?: T;
  items: (T extends true
    ? {
        isSelected: boolean;
        display: string;
        key: string;
      }
    : {
        display: string;
        key: string;
        isSelected?: never;
      })[];
  onItemClick?: T extends true
    ? (itemKey: string, isItemSelected: boolean) => void
    : (itemKey: string) => void;
};

export function List<T extends boolean>({
  items,
  onItemClick,
  areItemsSelectable,
}: ListProps<T>) {
  const handler = (playerId: string, isSelected?: boolean) => {
    if (!onItemClick) {
      return;
    }
    if (areItemsSelectable) {
      onItemClick(playerId, isSelected as boolean);
    } else {
      (onItemClick as (playerId: string) => void)(playerId);
    }
  };
  return (
    <StyledList $clickable={!!onItemClick}>
      {items.map(({ display, key, isSelected }) => (
        <li
          key={key}
          onClick={(ev) => {
            ev.stopPropagation();
            ev.preventDefault();
            if (areItemsSelectable) {
              handler(key, !isSelected);
            } else {
              handler(key);
            }
          }}
        >
          <FlexContainer $alignItems="center" $gap="0.5rem">
            {areItemsSelectable && (
              <CheckBox isChecked={isSelected as boolean} onChange={noop} />
            )}
            <FlexChild>{display}</FlexChild>
          </FlexContainer>
        </li>
      ))}
    </StyledList>
  );
}
