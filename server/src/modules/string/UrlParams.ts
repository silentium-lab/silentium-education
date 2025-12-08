import { Applied, MessageType } from "silentium";

/**
 * Возможность получить все параметры из урла
 */
export function UrlParams(
  $url: MessageType<string>,
): MessageType<Record<string, unknown>> {
  return Applied($url, ([url]) => {
    return Object.fromEntries(new URL(url).searchParams);
  });
}
