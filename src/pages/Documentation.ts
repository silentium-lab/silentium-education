import { OwnerType, TheInformation } from "silentium";
import { i18n, titleSrc } from "../store";
import { Template } from "silentium-components";

export class Documentation extends TheInformation {
  value(o: OwnerType<unknown>): this {
    const title = i18n.tr('documentation').value(titleSrc);

    const t = new Template();
    t.template(`<div class="article">
        <h1 class="title-1">${t.var(title)}</h1>
      </div>`).value(o);

    return this;
  }
}
