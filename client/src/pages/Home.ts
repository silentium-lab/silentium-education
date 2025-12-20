import { Section } from "@/models/sections/Section";
import { LiveCodeExample } from "@/modules/render/LiveCodeExample";
import { $title, Tr } from "@/store";
import { Record, Template } from "silentium-components";

/**
 * Home page
 */
export function Home() {
  $title.chain(Tr("home"));
  const section = new Section("home");
  return Template(
    (t) => `<section class="article">
      ${t.var(
        LiveCodeExample(
          Template(
            section.firstArticleContent(),
            Record({
              "[blog]": "Blog content",
            }),
          ),
        ),
      )}
    </section>`,
  );
}
