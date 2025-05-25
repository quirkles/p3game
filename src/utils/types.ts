export type MakeRequired<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;

export type AllowedFieldsWithType<Obj, Type> = {
  [K in keyof Obj]: Obj[K] extends Type ? K : never;
};

export type ExtractFieldsOfType<Obj, Type> = AllowedFieldsWithType<
  Obj,
  Type
>[keyof Obj];

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
