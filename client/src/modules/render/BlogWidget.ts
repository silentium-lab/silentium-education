import { ActualMessage, Applied, MaybeMessage } from "silentium";

/**
 * Latest blog posts [blog]
 */
export function BlogWidget(_base: MaybeMessage<string>) {
  const $base = ActualMessage(_base);
  return Applied($base, (base) => {
    return base.replaceAll("[blog]", "Latest posts");
  });
}
