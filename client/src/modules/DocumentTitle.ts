import { Late } from "silentium";

/**
 * Document header representation
 */
export function DocumentTitle() {
  const $src = Late(document.title);
  $src.then((v) => {
    document.title = v;
  });

  return $src;
}
