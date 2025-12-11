/**
 * Special range for paging
 */
export function PagingRange(page: number, limit: number) {
  return [
    ["skip", 0],
    ["limit", limit],
  ];
}
