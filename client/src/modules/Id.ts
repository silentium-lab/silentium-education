import {
	applied,
	EventType,
	of
} from "silentium";
import { v4 } from "uuid";

/**
 * Representation of a unique id
 */
export const id = (
	baseSrc: EventType<string> = of("id")
): EventType<string> => applied(
	baseSrc,
	(base) => `${base}_${v4()}`
);
