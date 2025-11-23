import { $title, i18n } from "@/store";
import { Local, Message } from "silentium";
import { Template } from "silentium-components";

export function Documentation() {
  return Message<string>((transport) => {
    $title.chain(i18n.tr("documentation"));

    const t = Template();
    t.template(`<div class="article">
		<h1 class="title-1">${t.var(Local($title))}</h1>
		</div>`);
    t.then(transport);
  });
}
