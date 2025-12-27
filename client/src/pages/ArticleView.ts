import { ArticleByCode } from "@/models/articles/ArticleByCode";
import { html } from "@/modules/plugins/lang/html";
import { Widgets } from "@/modules/render/Widgets";
import { SegmentBetween } from "@/modules/string/SegmentBetween";
import { Computed, Context, Default, Piped } from "silentium";
import { Template } from "silentium-components";

export function ArticleView() {
  const $url = Context("url");
  const $code = Default<string>(
    Computed(SegmentBetween, $url, "article/", "/view"),
    "",
  );
  return Piped(
    Template(
      (t) =>
        html`<section class="article">${t.raw(ArticleByCode($code))}</section>`,
    ),
    Widgets,
  );
}
