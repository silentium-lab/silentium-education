import { Late, MessageSource } from "silentium";

/**
 * URL representation associated with the History API
 */
export function HistoryUrl() {
  const $url = Late(location.pathname);
  return MessageSource<string>(
    (resolve) => {
      $url.then(resolve);
    },
    (value) => {
      const state = { page: value, timestamp: Date.now() };
      const title = `Page ${value}`;
      const url = `${value}`;
      history.pushState(state, title, url);
      $url.use(value);
    },
  );
}
