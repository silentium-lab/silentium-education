import { Applied, type EventType } from "silentium";

/**
 * CSS class name representation
 */
export function ClassName(s: EventType<string>): EventType<string> {
  return Applied(s, (s) => `.${s}`);
}
