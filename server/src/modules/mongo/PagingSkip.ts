import { omit, partialRight } from "lodash-es";
import { Applied, MessageType } from "silentium";

/**
 * Filter out paging fields from condition
 */
export function PagingSkip($conditions: MessageType) {
  return Applied($conditions, partialRight(omit, ["page", "limit"]));
}
