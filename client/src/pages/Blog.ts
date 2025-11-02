import { Event, type EventType } from "silentium";
import { Template } from "silentium-components";
import { i18n, titleSrc } from "../store";

export function Blog(): EventType<string> {
  return Event((u) => {
    const title = i18n.tr("blog");
    title.event(titleSrc);

    const t = Template().event(u);
    t.template(
      `<div class='article'>
        <h1 class="title-1">${t.var(title)}</h1>
      </div>`,
    );
  });
}
