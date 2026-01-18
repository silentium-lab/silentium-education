import { Loading } from "@/components/ui/Loading";
import { SectionFirstArticle } from "@/models/sections/SectionFirstArticle";
import { Tr } from "@/modules/I18n";
import { html } from "@/modules/plugins/lang/html";
import { LiveCodeExample } from "@/modules/render/LiveCodeExample";
import { Widgets } from "@/modules/render/Widgets";
import { Context, Piped } from "silentium";
import { Template } from "silentium-components";

/**
 * Home page
 */
export function Home() {
  Context("title").chain(Tr("home"));
  const $section = SectionFirstArticle("home");
  return Piped(
    Template(
      (t) =>
        html`<section class="article">
          ${t.raw(Loading(LiveCodeExample($section)))}
        </section>`,
    ),
    Widgets,
  );
}
