import { Section } from "@/models/sections/Section";
import { $title, Tr } from "@/store";
import { Local } from "silentium";
import { Template } from "silentium-components";

export function About() {
  $title.chain(Tr("about"));
  const section = new Section("about");
  return Template(
    (t) => `<section class="article">
      <h1 class="title-1">${t.var(Local($title))}</h1>
      ${t.var(section.firstArticleContent())}
    </section>`,
  );
}
