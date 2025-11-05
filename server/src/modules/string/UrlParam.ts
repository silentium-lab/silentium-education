import { All, Applied, EventType, Filtered } from "silentium";

/**
 * Возможность получить значение параметра урла из
 * самого урла и названия параметра
 */
export function UrlParam(
  $url: EventType<string>,
  $param: EventType<string>,
): EventType<string> {
  return Filtered(
    Applied(All($url, $param), ([url, param]) => {
      return new URL(url).searchParams.get(param);
    }),
    Boolean,
  );
}
