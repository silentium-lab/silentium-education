import {  lateShared, SourceType } from "silentium";

/**
 * Document header representation
 */
export const documentTitle = (): SourceType<string> => {
	const src = lateShared(document.title);

	return {
		event: src.event,
		use: (v) => {
			src.use(v);
			document.title = v;
		},
	}
}
