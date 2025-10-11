import {
	EventType,
	fromEvent,
	of
} from "silentium";

/**
 * DOM element click even
 */
export const clicked = (
	elSrc: EventType<HTMLElement>
): EventType<Event> => fromEvent(
	elSrc,
	of('click'),
	of('addEventListener'),
	of('removeEventListener'),
)
