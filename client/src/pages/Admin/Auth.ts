import { Event, type EventType } from "silentium";
import { Template } from "silentium-components";
import { i18n, $title } from "../../store";

export function Auth(): EventType<string> {
  return Event((transport) => {
    const title = i18n.tr("Auth");
    title.event($title);
    const t = Template();
    t.template(`<div class="article">
			<h1 class="title-1">${t.var(title)}</h1>
		</div>`);
    t.event(transport);
  });
}
