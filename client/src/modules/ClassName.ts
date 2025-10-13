import { applied, type EventType } from "silentium";

/**
 * CSS class name representation
 */
export const className = (s: EventType<string>): EventType<string> =>
	applied(s, (s) => `.${s}`);
