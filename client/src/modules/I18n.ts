import {
  ActualMessage,
  All,
  Applied,
  MaybeMessage,
  MessageType,
} from "silentium";

/**
 * Representation of static translation texts
 */
export const i18n = (
  langSrc: MessageType<string>,
  translationsSrc: MessageType<Record<string, Record<string, string>>>,
) => ({
  tr: (field: MaybeMessage<string>) => {
    const $field = ActualMessage(field);
    return Applied(
      All(langSrc, translationsSrc, $field),
      ([l, translations, field]) => {
        return translations?.[l]?.[field] ?? field;
      },
    );
  },
});
