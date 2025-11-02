import { Event, type EventType } from "silentium";
import { Template } from "silentium-components";
import { i18n, titleSrc } from "../store";

export function Documentation(): EventType<string> {
  return Event((transport) => {
    const title = i18n.tr("documentation");
    title.event(titleSrc);

    const t = Template().event(transport);
    t.template(`<div class="article">
		<h1 class="title-1">${t.var(title)}</h1>
		</div>`);
  });
}
