import { ArticleByCode } from "@/models/articles/ArticleByCode";
import { Widgets } from "@/modules/render/Widgets";
import { SegmentBetween } from "@/modules/string/SegmentBetween";
import { Computed, Context, Default, Piped } from "silentium";
import { Template } from "silentium-components";

export function ArticleView(base: string) {
  const $url = Context("url");
  const $code = Default<string>(
    Computed(SegmentBetween, $url, `${base}/`, "/view"),
    "",
  );

  return Piped(
    Template(
      (t) => `<section class="article">
      ${t.var(ArticleByCode($code))}
    </section>`,
    ),
    Widgets,
  );
}
