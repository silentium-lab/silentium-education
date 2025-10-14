import { LateShared, type SourceType } from "silentium";

/**
 * URL representation associated with the History API
 */
export const HistoryUrl = (): SourceType<string> => {
	const urlSrc = LateShared(location.pathname);
	return {
		use: (value) => {
			const state = { page: value, timestamp: Date.now() };
			const title = `Page ${value}`;
			const url = `${value}`;

			history.pushState(state, title, url);
			urlSrc.use(value);
		},
		event: (u) => {
			urlSrc.event(u);
		},
	};
};
