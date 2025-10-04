import {
	DataType,
	fromEvent,
	of
} from "silentium";

/**
 * DOM element keypress even
 */
export const keyPressed = <T extends Event>(elSrc: DataType<HTMLElement>): DataType<T> => {
	return (u) => {
		fromEvent(
			elSrc,
			of("keyup"),
			of("addEventListener"),
			of("removeEventListener"),
		)(u);
	}
}
