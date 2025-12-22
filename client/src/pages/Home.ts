import { SectionFirstArticle } from "@/models/sections/SectionFirstArticle";
import { LiveCodeExample } from "@/modules/render/LiveCodeExample";
import { Widgets } from "@/modules/render/Widgets";
import { Tr } from "@/store";
import { Context } from "silentium";
import { Template } from "silentium-components";

/**
 * Home page
 */
export function Home() {
  Context("title").chain(Tr("home"));
  const $section = SectionFirstArticle("home");
  return Template(
    (t) => `<section class="article">
      ${t.var(LiveCodeExample(Template($section, Widgets())))}
    </section>`,
  );
}
