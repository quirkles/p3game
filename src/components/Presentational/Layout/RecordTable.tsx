import { Fragment } from "react";
import { Span } from "@/components/Presentational/Typography/Span";
import {
  GridContainer,
  GridItem,
} from "@/components/Presentational/Layout/Grid";
import { Heading } from "@/components/Presentational/Heading";

interface TableProps<T extends Record<string, string | number>> {
  data: T;
}

export function RecordTable<T extends Record<string, string | number>>(
  props: TableProps<T>,
) {
  return (
    <GridContainer $columns={2}>
      <GridItem $xsCol={2}>
        <Heading $level={3}>Details</Heading>
      </GridItem>
      {Object.entries(props.data)
        .sort((a, b) => {
          return a[0].localeCompare(b[0]);
        })
        .map(([key, value]) => (
          <Fragment key={key}>
            <GridItem $xsCol={1}>
              <Span $fontWeight="bold">{key}</Span>
            </GridItem>
            <GridItem $xsCol={1}>
              <Span>{value}</Span>
            </GridItem>
          </Fragment>
        ))}
    </GridContainer>
  );
}
