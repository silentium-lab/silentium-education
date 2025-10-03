import {
	DataType,
	fromEvent,
	of
} from "silentium";

/**
 * DOM element keypress even
 */
export const keyPressed = (elSrc: DataType<HTMLElement>): DataType<Event> => {
	return (u) => {
		fromEvent(
			elSrc,
			of("keyup"),
			of("addEventListener"),
			of("removeEventListener"),
		)(u);
	}
}
