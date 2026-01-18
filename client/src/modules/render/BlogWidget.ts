import { Actual, Applied, MaybeMessage } from "silentium";

/**
 * Latest blog posts [blog]
 */
export function BlogWidget(_base: MaybeMessage<string>) {
  const $base = Actual(_base);
  return Applied($base, (base) => {
    return base.replaceAll("[blog]", "Latest posts");
  });
}
