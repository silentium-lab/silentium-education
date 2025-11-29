import { $title, i18n } from "@/store";
import { Local } from "silentium";
import { Template } from "silentium-components";

export function Documentation() {
  $title.chain(i18n.tr("documentation"));

  return Template(
    (t) => `<div class="article">
      <h1 class="title-1">${t.var(Local($title))}</h1>
    </div>`,
  );
}
