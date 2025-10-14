import { type EventType, FromEvent, Of } from "silentium";

/**
 * DOM element click even
 */
export const Clicked = (elSrc: EventType<HTMLElement>): EventType<Event> =>
	FromEvent(
		elSrc,
		Of("click"),
		Of("addEventListener"),
		Of("removeEventListener"),
	);
