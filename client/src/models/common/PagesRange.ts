import { PagesTotal } from "@/models/common/PagesTotal";
import { range } from "lodash-es";

/**
 * Array of pages
 */
export function PagesRange(total: number, limit: number) {
  return range(1, PagesTotal(total, limit) + 1);
}
