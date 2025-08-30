import { OwnerType, TheInformation } from "silentium";
import { Template } from "silentium-components";
import { Counter } from "../chunks/Counter";
import { titleSrc } from "../store";

export class About extends TheInformation {
  value(o: OwnerType<unknown>): this {
    titleSrc.give('О нас');
    const t = new Template();
    t.template(
      `<div>About Page</div>
      <div>${t.var(new Counter())}</div>
      <div>${t.var(new Counter())}</div>`
    ).value(o);

    return this;
  }
}
