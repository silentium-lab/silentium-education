import { ArticleByCode } from "@/models/articles/ArticleByCode";
import { SegmentBetween } from "@/modules/string/SegmentBetween";
import { Computed, Context, Default } from "silentium";
import { Template } from "silentium-components";

export function BlogView() {
  const $url = Context("url");
  const $code = Default<string>(
    Computed(SegmentBetween, $url, "blog/", "/view"),
    "",
  );

  return Template(
    (t) => `<section class="article">
      ${t.var(ArticleByCode($code))}
    </section>`,
  );
}
