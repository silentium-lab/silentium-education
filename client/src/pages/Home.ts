import { Section } from "@/models/sections/Section";
import { $title, Tr } from "@/store";
import { Record, Template } from "silentium-components";

export function Home() {
  $title.chain(Tr("home"));
  const section = new Section("home");
  return Template(
    (t) => `<section class="article">
      ${t.var(
        Template(
          section.firstArticleContent(),
          Record({
            "[blog]": "Blog content",
          }),
        ),
      )}
    </section>`,
  );
}
