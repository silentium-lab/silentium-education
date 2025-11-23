import { Counter } from "@/chunks/Counter";
import { $title, i18n } from "@/store";
import { Local, Message } from "silentium";
import { Template } from "silentium-components";

export function About() {
  return Message<string>((transport) => {
    $title.chain(i18n.tr("about"));
    const t = Template();
    t.template(
      `<section class="article">
        <h1 class="title-1">${t.var(Local($title))}</h1>
        <div class="flex flex-col gap-1">
          <div>${t.var(Counter())}</div>
          <div>${t.var(Counter())}</div>
        </div>
      </section>`,
    );
    t.then(transport);
    return function AboutDestroy() {
      t.destroy();
    };
  });
}
