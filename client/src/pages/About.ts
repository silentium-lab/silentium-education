import { Counter } from "@/chunks/Counter";
import { $title, i18n } from "@/store";
import { Local } from "silentium";
import { Template } from "silentium-components";

export function About() {
  $title.chain(i18n.tr("about"));

  return Template(
    (t) => `<section class="article">
      <h1 class="title-1">${t.var(Local($title))}</h1>
      <div class="flex flex-col gap-1">
        <div>${t.var(Counter())}</div>
        <div>${t.var(Counter())}</div>
      </div>
    </section>`,
  );
}
