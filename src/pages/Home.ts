import { OwnerType, TheInformation } from "silentium";
import { Template } from "silentium-components";
import { titleSrc } from "../store";
import { Counter } from "../chunks/Counter";

export class Home extends TheInformation<string> {
  value(o: OwnerType<unknown>): this {
    titleSrc.give('Главная');
    const t = new Template();
    t.template(
      `<div>Home Page</div>
      <div>${t.var(new Counter())}</div>`
    ).value(o);
    return this;
  }
}
