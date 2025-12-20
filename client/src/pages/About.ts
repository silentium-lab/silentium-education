import { Section } from "@/models/sections/Section";
import { $title, Tr } from "@/store";
import { Template } from "silentium-components";

export function About() {
  $title.chain(Tr("about"));
  const section = new Section("about");
  return Template(
    (t) => `<section class="article">
      ${t.var(section.firstArticleContent())}
    </section>`,
  );
}
