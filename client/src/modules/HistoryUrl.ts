import { LateShared, type SourceType } from "silentium";

/**
 * URL representation associated with the History API
 */
export function HistoryUrl(): SourceType<string> {
  const $url = LateShared(location.pathname);
  return {
    use: (value) => {
      const state = { page: value, timestamp: Date.now() };
      const title = `Page ${value}`;
      const url = `${value}`;
      history.pushState(state, title, url);
      $url.use(value);
    },
    pipe(u) {
      $url.pipe(u);
      return this;
    },
  };
}
