import { lateShared, SourceType } from "silentium";

/**
 * URL representation associated with the History API
 */
export const historyUrl = (): SourceType<string> => {
	const urlSrc = lateShared(location.pathname);
	return {
		give: (value) => {
			const state = { page: value, timestamp: Date.now() };
			const title = `Page ${value}`;
			const url = `${value}`;

			history.pushState(state, title, url);
			urlSrc.give(value);
		},
		value: (u) => {
			urlSrc.value(u);
		},
	}
}
