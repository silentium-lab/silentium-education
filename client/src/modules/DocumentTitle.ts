import { LateShared, type SourceType } from "silentium";

/**
 * Document header representation
 */
export const DocumentTitle = (): SourceType<string> => {
	const src = LateShared(document.title);

	return {
		event: src.event,
		use: (v) => {
			src.use(v);
			document.title = v;
		},
	};
};
