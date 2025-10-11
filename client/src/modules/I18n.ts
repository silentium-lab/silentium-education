import { all, applied, EventType } from "silentium";

/**
 * Representation of static translation texts
 */
export const i18n = (
	langSrc: EventType<string>,
	translationsSrc: EventType<
		Record<string, Record<string, string>>
	>,
) => ({
	tr: (field: string) => {
		return applied(
			all(langSrc, translationsSrc),
			([l, translations]) => {
				return translations?.[l]?.[field] ?? field;
			},
		);
	}
})
