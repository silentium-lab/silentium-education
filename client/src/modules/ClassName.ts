import { Applied, type EventType } from "silentium";

/**
 * CSS class name representation
 */
export const className = (s: EventType<string>): EventType<string> =>
	Applied(s, (s) => `.${s}`);
