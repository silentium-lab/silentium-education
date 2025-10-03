import {
	DataType,
	fromEvent,
	of
} from "silentium";

/**
 * DOM element click even
 */
export const clicked = (
	elSrc: DataType<HTMLElement>
): DataType<Event> => fromEvent(
	elSrc,
	of('click'),
	of('addEventListener'),
	of('removeEventListener'),
)
