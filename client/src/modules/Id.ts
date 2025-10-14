import { Applied, type EventType, Of } from "silentium";
import { v4 } from "uuid";

/**
 * Representation of a unique id
 */
export const Id = (baseSrc: EventType<string> = Of("id")): EventType<string> =>
	Applied(baseSrc, (base) => `${base}_${v4()}`);
