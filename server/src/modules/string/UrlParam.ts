import { All, Applied, Filtered, MessageType } from "silentium";

/**
 * Возможность получить значение параметра урла из
 * самого урла и названия параметра
 */
export function UrlParam(
  $url: MessageType<string>,
  $param: MessageType<string>,
): MessageType<string> {
  return Filtered(
    Applied(All($url, $param), ([url, param]) => {
      return new URL(url).searchParams.get(param);
    }),
    Boolean,
  );
}
