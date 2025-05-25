import { generateAllSubstrings } from "@/utils/string";
import { ExtractFieldsOfType } from "@/utils/types";

export function createSearchIndex<T extends object>(
  item: T,
  fields: ExtractFieldsOfType<T, string>[],
): T & { _searchIdx: string[] } {
  const searchIdx = new Set<string>();
  fields.forEach((field) => {
    for (const substring of generateAllSubstrings(item[field] as string)) {
      searchIdx.add(substring);
    }
  });
  return { ...item, _searchIdx: [...searchIdx] };
}
