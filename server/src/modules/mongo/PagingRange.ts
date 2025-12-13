/**
 * Special range for paging
 */
export function PagingRange(page: number, limit: number) {
  return [
    ["skip", (page - 1) * limit],
    ["limit", limit],
  ];
}
