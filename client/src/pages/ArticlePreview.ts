import { Loading } from "@/components/ui/Loading";
import { ArticleByPreview } from "@/models/articles/ArticleByPreview";
import { html } from "@/modules/plugins/lang/html";
import { LiveCodeExample } from "@/modules/render/LiveCodeExample";
import { Widgets } from "@/modules/render/Widgets";
import { SegmentBetween } from "@/modules/string/SegmentBetween";
import { Computed, Context, Default, Piped } from "silentium";
import { Template } from "silentium-components";

export function ArticlePreview() {
  const $url = Context("url");
  const $code = Default<string>(
    Computed(SegmentBetween, $url, "article/", "/preview"),
    "",
  );
  return Piped(
    Template(
      (t) =>
        html`<section class="article">
          ${t.raw(Loading(LiveCodeExample(ArticleByPreview($code))))}
        </section>`,
    ),
    Widgets,
  );
}
