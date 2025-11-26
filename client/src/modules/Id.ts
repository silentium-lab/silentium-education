import { All, Applied, MessageType, Of } from "silentium";
import { v4 } from "uuid";

/**
 * Representation of a unique id
 */
export function Id(baseSrc: MessageType<string> = Of("id")) {
  return Applied(All(baseSrc, Of(v4())), (v) => v.join("_"));
}
