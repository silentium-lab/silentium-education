import { Applied, MessageType } from "silentium";

/**
 * CSS class name representation
 */
export function ClassName(s: MessageType<string>) {
  return Applied<string, string>(s, (s) => "." + s);
}
