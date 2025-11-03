import { Event, type EventType } from "silentium";
import { Template } from "silentium-components";
import { Counter } from "@/chunks/Counter";
import { i18n, $title } from "@/store";

export function About(): EventType<string> {
  return Event((transport) => {
    const title = i18n.tr("about");
    title.event($title);
    const t = Template();
    t.template(
      `<section class="article">
        <h1 class="title-1">${t.var(title)}</h1>
        <div class="flex flex-col gap-1">
          <div>${t.var(Counter())}</div>
          <div>${t.var(Counter())}</div>
        </div>
      </section>`,
    );
    t.event(transport);
    return function AboutDestroy() {
      t.destroy();
    };
  });
}
