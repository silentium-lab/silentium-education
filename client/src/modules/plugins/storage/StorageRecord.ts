import {
	type EventType,
	lateShared,
	primitive,
	type SourceType,
} from "silentium";

/**
 * Data representation from Storage API
 */
export const storageRecord = <T = string>(
	nameSrc: EventType<string>,
	defaultValue?: unknown,
	storageType = "localStorage",
): SourceType<T> => {
	const nameSync = primitive(nameSrc);
	const resultSrc = lateShared<T>();
	const result: SourceType<T> = {
		event: (u) => {
			resultSrc.event(u);
			const storage = window[storageType];
			nameSrc((name) => {
				window.addEventListener("storage", (e) => {
					if (e.storageArea === storage) {
						if (e.key === name) {
							const newValue = e.newValue
								? JSON.parse(e.newValue)
								: defaultValue;
							if (newValue !== undefined && newValue !== null) {
								result.use(newValue as T);
							}
						}
					}
				});
				if (storage[name]) {
					try {
						resultSrc.use(JSON.parse(storage[name]));
					} catch {
						console.warn(`LocalStorageRecord cant parse value ${name}`);
					}
				} else if (defaultValue !== undefined) {
					result.use(defaultValue as T);
				}
			});
		},
		use: (v) => {
			const storage = window[storageType];
			resultSrc.use(v);

			try {
				storage[nameSync.primitive()] = JSON.stringify(v);
			} catch {
				console.warn(`LocalStorageRecord cant stringify value`);
			}
		},
	};

	return result;
};
