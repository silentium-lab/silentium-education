import { All, Applied, type EventType, Filtered } from "silentium";

export const SplitPart =
	(
		baseSrc: EventType<string>,
		splitSrc: EventType<string>,
		indexSrc: EventType<number>,
	): EventType<string> =>
	(user) => {
		Filtered(
			Applied(All(baseSrc, splitSrc, indexSrc), ([base, split, index]) => {
				const parts = base.split(split);
				return parts[index];
			}),
			(r) => r !== undefined,
		)(user);
	};
