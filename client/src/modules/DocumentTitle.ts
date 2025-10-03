import {  lateShared, SourceType } from "silentium";

/**
 * Document header representation
 */
export const documentTitle = (): SourceType<string> => {
	const src = lateShared(document.title);

	return {
		value: (u) => {
			src.value(u);
		},
		give: (v) => {
			src.give(v);
			document.title = v;
		},
	}
}
