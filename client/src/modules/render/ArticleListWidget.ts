import { ActualMessage, Applied, MaybeMessage } from "silentium";

/**
 * Articles widget searches for [articles]
 */
export function ArticleListWidget(_base: MaybeMessage<string>) {
  const $base = ActualMessage(_base);
  return Applied($base, (base) => {
    return base.replaceAll(
      "[articles?category=silentium-internals]",
      "done!!!",
    );
  });
}
