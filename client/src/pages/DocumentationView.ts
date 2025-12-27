import { ArticleByCode } from "@/models/articles/ArticleByCode";
import { html } from "@/modules/plugins/lang/html";
import { SegmentBetween } from "@/modules/string/SegmentBetween";
import { Computed, Context, Default } from "silentium";
import { Template } from "silentium-components";

export function DocumentationView() {
  const $url = Context("url");
  const $code = Default<string>(
    Computed(SegmentBetween, $url, "documentation/", "/view"),
    "",
  );

  return Template(
    (t) =>
      html`<section class="article">${t.var(ArticleByCode($code))}</section>`,
  );
}
