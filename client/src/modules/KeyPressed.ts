import {
	EventType,
	fromEvent,
	of
} from "silentium";

/**
 * DOM element keypress even
 */
export const keyPressed = <T extends Event>(elSrc: EventType<HTMLElement>): EventType<T> => {
	return (u) => {
		fromEvent<T>(
			elSrc,
			of("keyup"),
			of("addEventListener"),
			of("removeEventListener"),
		)(u);
	}
}
