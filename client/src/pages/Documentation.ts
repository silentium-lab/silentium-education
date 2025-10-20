import type { EventType } from "silentium";
import { Template } from "silentium-components";
import { i18n, titleSrc } from "../store";

export function Documentation(): EventType<string> {
  return function DocumentationEvent(u) {
    const title = i18n.tr("documentation");
    title(titleSrc.use);

    const t = Template();
    t.template(`<div class="article">
		<h1 class="title-1">${t.var(title)}</h1>
		</div>`);
    t.value(u);
  };
}
