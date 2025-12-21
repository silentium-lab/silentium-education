import { SectionFirstArticle } from "@/models/sections/SectionFirstArticle";
import { $title, Tr } from "@/store";
import { Template } from "silentium-components";

export function About() {
  $title.chain(Tr("about"));
  const $section = SectionFirstArticle("about");
  return Template(
    (t) => `<section class="article">
      ${t.var($section)}
    </section>`,
  );
}
