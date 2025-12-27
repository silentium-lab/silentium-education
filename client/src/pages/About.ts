import { SectionFirstArticle } from "@/models/sections/SectionFirstArticle";
import { html } from "@/modules/plugins/lang/html";
import { Tr } from "@/store";
import { Context } from "silentium";
import { Template } from "silentium-components";

export function About() {
  Context("title").chain(Tr("about"));
  const $section = SectionFirstArticle("about");
  return Template(
    (t) => html`<section class="article">${t.var($section)}</section>`,
  );
}
