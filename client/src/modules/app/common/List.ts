import { Applied, MessageType } from "silentium";

/**
 * List rendered to string
 */
export function List($list: MessageType<unknown[]>) {
  return Applied($list, (l) => l.join(""));
}
