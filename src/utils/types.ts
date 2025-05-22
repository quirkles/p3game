export type MakeRequired<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;

export type GetTypeString<T extends string | number | boolean | Date> =
  T extends string
    ? "string"
    : T extends number
      ? "number"
      : T extends boolean
        ? "boolean"
        : T extends Date
          ? "date"
          : never;
