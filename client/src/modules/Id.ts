import { Applied, MessageType, Of } from "silentium";
import { v4 } from "uuid";

/**
 * Representation of a unique id
 */
export function Id(baseSrc: MessageType<string> = Of("id")) {
  return Applied(baseSrc, (base) => `${base}_${v4()}`);
}
