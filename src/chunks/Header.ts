import {
  OwnerType,
  TheInformation,
} from "silentium";
import { Template } from "silentium-components";
import { Link } from "../components/Link";
import { logoSrc } from "./Logo";

export class Header extends TheInformation<string> {
  public value(o: OwnerType<string>): this {
    const t = new Template();
    t.template(
      `<header class="mb-2 flex justify-between py-2 gap-2 min-h-10 items-center">
        ${t.var(logoSrc)}
        <nav class="flex gap-2 flex-wrap">
          ${t.var(new Link("/about", "О нас"))}
          ${t.var(new Link("/documentation", "Документация"))}
          ${t.var(new Link("/contacts", "Контакты"))}
        </nav>
      </header>`,
    ).value(o);

    return this;
  }
}
