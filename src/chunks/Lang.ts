import {
  OwnerType,
  TheInformation,
} from "silentium";
import { Template } from "silentium-components";
import { Link } from "../components/Link";

export class Lang extends TheInformation<string> {
  public value(o: OwnerType<string>): this {
    const t = new Template();
    t.template(
      `<nav class="px-2">
        ${t.var(new Link("/documentation", "Документация", "underline"))}
        ${t.var(new Link("/blog", "Блог", "underline"))}
      </nav>`,
    ).value(o);

    return this;
  }
}
