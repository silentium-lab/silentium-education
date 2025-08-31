import { OwnerType, TheInformation } from "silentium";
import { Template } from "silentium-components";
import { Counter } from "../chunks/Counter";
import { i18n, titleSrc } from "../store";

export class About extends TheInformation {
  value(o: OwnerType<unknown>): this {
    const title = i18n.tr('about').value(titleSrc);
    const t = new Template();
    t.template(
      `<section class="article">
        <h1 class="title-1">${t.var(title)}</h1>
        <div class="flex flex-col gap-1">
          <div>${t.var(new Counter())}</div>
          <div>${t.var(new Counter())}</div>
        </div>
      </section>`
    ).value(o);

    return this;
  }
}
