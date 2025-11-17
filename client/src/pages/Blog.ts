import { $title, i18n } from "@/store";
import { Message } from "silentium";
import { Template } from "silentium-components";

export function Blog() {
  return Message<string>((u) => {
    const title = i18n.tr("blog");
    title.pipe($title);

    const t = Template();
    t.template(
      `<div class='article'>
        <h1 class="title-1">${t.var(title)}</h1>
      </div>`,
    );
    t.pipe(u);
  });
}
