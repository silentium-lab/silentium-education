import {
	applied,
	DataType
} from "silentium";

/**
 * CSS class name representation
 */
export const className = (
	s: DataType<string>
): DataType<string> =>
	applied(s, (s) => `.${s}`)
