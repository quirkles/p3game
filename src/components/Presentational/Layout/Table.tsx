interface TableProps<T extends Record<string, string | number>> {
  data: T[];
}

export function Table<T extends Record<string, string | number>>(
  props: TableProps<T>,
) {
  return <div>Table</div>;
}
