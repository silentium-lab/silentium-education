import { LateShared, type SourceType } from "silentium";

/**
 * Document header representation
 */
export function DocumentTitle(): SourceType<string> {
  const $src = LateShared(document.title);

  return {
    pipe: $src.pipe.bind($src),
    use: (v) => {
      $src.use(v);
      document.title = v;
    },
  };
}
