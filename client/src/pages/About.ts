import { SectionFirstArticle } from "@/models/sections/SectionFirstArticle";
import { Tr } from "@/store";
import { Context } from "silentium";
import { Template } from "silentium-components";

export function About() {
  Context("title").chain(Tr("about"));
  const $section = SectionFirstArticle("about");
  return Template(
    (t) => `<section class="article">
      ${t.var($section)}
    </section>`,
  );
}
