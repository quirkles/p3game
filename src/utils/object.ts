export function isKeyOf<T extends object>(
  obj: T,
  key: string | number | symbol,
): key is keyof T {
  return key in obj;
}

export function keys<T extends Record<string | number | symbol, unknown>>(
  obj: T,
): T extends Record<infer K, unknown> ? K[] : unknown[] {
  return Object.keys(obj).reduce((acc: (string | number | symbol)[], key) => {
    if (obj.hasOwnProperty(key)) {
      acc.push(key);
    }
    return acc;
  }, []) as T extends Record<infer K, unknown> ? K[] : unknown[];
}

export function values<T extends Record<string, unknown>>(
  obj: T,
): T extends Record<string, infer U> ? U[] : unknown[] {
  return keys(obj).map((key) => obj[key]) as T extends Record<string, infer U>
    ? U[]
    : unknown[];
}

export function filterMapReduceValues<
  R extends Record<string | number | symbol, unknown>,
  MV,
  RV = R extends Record<string | number | symbol, infer U> ? U : unknown,
>(
  record: Record<string | number | symbol, RV>,
  fns: { map?: (arg: RV) => MV; filter?: (arg: RV) => boolean },
): typeof fns.map extends undefined ? RV[] : MV[] {
  const results: (MV | RV)[] = [];

  for (const value of values(record)) {
    if (!fns.filter || fns.filter(value)) {
      results.push(fns.map ? fns.map(value) : value);
    }
  }

  return results as typeof fns.map extends undefined ? RV[] : MV[];
}
