import { $title, i18n } from "@/store";
import { Local, Message } from "silentium";
import { Template } from "silentium-components";

export function Blog() {
  return Message<string>((u) => {
    $title.chain(i18n.tr("blog"));

    const t = Template();
    t.template(
      `<div class='article'>
        <h1 class="title-1">${t.var(Local($title))}</h1>
      </div>`,
    );
    t.then(u);
  });
}
