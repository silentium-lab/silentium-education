import { get } from "lodash-es";
import { ActualMessage, All, Applied, Context, MaybeMessage } from "silentium";

const $lang = Context<string>("lang");
const $translations = Context<Record<string, any>>("translations");

export function Tr(field: MaybeMessage<string>) {
  const $field = ActualMessage(field);
  return Applied(
    All($lang, $translations, $field),
    ([l, translations, field]) => {
      return translations?.[l]?.[field] ?? field;
    },
  );
}

export function TrDynamic(
  basePath: string,
  translatedPath: string,
  lang: string,
) {
  return lang === "ru" ? basePath : translatedPath.replaceAll("$l", lang);
}

export function TrDynamicValue(
  record: any,
  basePath: string,
  translatedPath: string,
  lang: string,
) {
  return lang === "ru"
    ? record[basePath]
    : (get(record, translatedPath.replaceAll("$l", lang)) ?? record[basePath]);
}
