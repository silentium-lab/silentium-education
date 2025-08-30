import { OwnerType, TheInformation } from "silentium";
import { Template } from "silentium-components";
import { Counter } from "../chunks/Counter";
import { titleSrc } from "../store";

export class Admin extends TheInformation {
  value(o: OwnerType<unknown>): this {
    titleSrc.give('Админ панель');
    const t = new Template();
    t.template(
      `<section class="article">
        <h1 class="title-1">Админ панель</h1>
        <div>${t.var(new Counter())}</div>
        <div>${t.var(new Counter())}</div>
      </section>`
    ).value(o);

    return this;
  }
}
