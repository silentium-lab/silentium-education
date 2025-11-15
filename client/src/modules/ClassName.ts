import { Applied, MessageType } from "silentium";

/**
 * CSS class name representation
 */
export function ClassName(s: MessageType<string>) {
  return Applied(s, (s) => `.${s}`);
}
