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

// Accepts an object with multiple fields and returns a union of objects, one for each field, with that field and ever other field set to never
export type OneOf<T extends object> = {
  [K in keyof T]: { [P in Exclude<keyof T, K>]: never } & { [P in K]: T[P] };
}[keyof T];