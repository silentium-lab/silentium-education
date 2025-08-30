import { OwnerType, TheInformation } from "silentium";
import { Template } from "silentium-components";
import { titleSrc } from "../store";
import { Counter } from "../chunks/Counter";

export class Home extends TheInformation<string> {
  value(o: OwnerType<unknown>): this {
    titleSrc.give('Главная');
    const t = new Template();
    t.template(
      `<section class="article">
        <h1 class="title-1">
          Home Page
        </h1>
        <div>${t.var(new Counter())}</div>
      </section>`
    ).value(o);
    return this;
  }
}
