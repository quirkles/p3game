import { Span } from "@/components/Presentational/Typography/Span";
import styled from "styled-components";
import { getColor } from "@/styles/colors";

interface TableProps<T extends Record<string, string | number>> {
  data: T;
}

const StyledTable = styled.table`
  border-collapse: collapse;
  tbody {
  }
  tr {
    td {
      padding: 0.25rem;
    }
    background-color: ${getColor("grey2")};
    &:nth-child(even) {
      background-color: ${getColor("grey1")};
    }
  }
`;

export function RecordTable<T extends Record<string, string | number>>(
  props: TableProps<T>,
) {
  return (
    <StyledTable>
      <tbody>
        {Object.entries(props.data)
          .sort((a, b) => {
            return a[0].localeCompare(b[0]);
          })
          .map(([key, value]) => (
            <tr key={key}>
              <td>
                <Span $fontWeight="bold">{key}</Span>
              </td>
              <td>
                <Span>{value}</Span>
              </td>
            </tr>
          ))}
      </tbody>
    </StyledTable>
  );
}
