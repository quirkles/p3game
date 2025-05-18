export function sortByKey<T>(array: T[], key: keyof T): T[] {
  return array.sort((a, b) => (a[key] > b[key] ? 1 : -1));
}

export function unique<T>(array: T[]): T[] {
  return [...new Set(array)];
}

export function last<T>(array: T[]): T | undefined {
  return array[array.length - 1];
}

export function batchArray<T>(array: T[], size: number): T[][] {
  return array.reduce(
    (acc: T[][], item: T) => {
      if (last(acc)?.length === size) {
        acc.push([item]);
      } else {
        last(acc)?.push(item);
      }
      return acc;
    },
    [[]],
  );
}
