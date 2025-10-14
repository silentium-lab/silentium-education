import { type EventType, FromEvent, Of } from "silentium";

/**
 * DOM element keypress even
 */
export const KeyPressed = <T extends Event>(
	elSrc: EventType<HTMLElement>,
): EventType<T> => {
	return (u) => {
		FromEvent<T>(
			elSrc,
			Of("keyup"),
			Of("addEventListener"),
			Of("removeEventListener"),
		)(u);
	};
};
