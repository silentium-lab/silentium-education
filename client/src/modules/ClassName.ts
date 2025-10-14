import { Applied, type EventType } from "silentium";

/**
 * CSS class name representation
 */
export const ClassName = (s: EventType<string>): EventType<string> =>
	Applied(s, (s) => `.${s}`);
