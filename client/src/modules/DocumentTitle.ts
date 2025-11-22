import { LateShared } from "silentium";

/**
 * Document header representation
 */
export function DocumentTitle() {
  const $src = LateShared(document.title);
  $src.then((v) => {
    document.title = v;
  });

  return $src;
}
