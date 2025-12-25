import { SectionFirstArticle } from "@/models/sections/SectionFirstArticle";
import { LiveCodeExample } from "@/modules/render/LiveCodeExample";
import { Widgets } from "@/modules/render/Widgets";
import { Tr } from "@/store";
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
      (t) => `<section class="article">
        ${t.var(LiveCodeExample(Template($section)))}
      </section>`,
    ),
    Widgets,
  );
}
