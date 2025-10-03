import {
	applied,
	DataType,
	of
} from "silentium";
import { v4 } from "uuid";

/**
 * Representation of a unique id
 */
export const id = (
	baseSrc: DataType<string> = of("id")
): DataType<string> => applied(
	baseSrc,
	(base) => `${base}_${v4()}`
);
