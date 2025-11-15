import { All, Applied, MessageType } from "silentium";

/**
 * Representation of static translation texts
 */
export const i18n = (
  langSrc: MessageType<string>,
  translationsSrc: MessageType<Record<string, Record<string, string>>>,
) => ({
  tr: (field: string) => {
    return Applied(All(langSrc, translationsSrc), ([l, translations]) => {
      return translations?.[l]?.[field] ?? field;
    });
  },
});
