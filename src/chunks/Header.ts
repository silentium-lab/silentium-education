import { type OwnerType, TheInformation } from "silentium";
import { Template } from "silentium-components";
import { Link } from "../components/Link";
import { i18n } from "../store";
import { Lang } from "./Lang";
import { logoSrc } from "./Logo";

export class Header extends TheInformation<string> {
  public value(o: OwnerType<string>): this {
    const t = new Template();
    t.template(
      `<header class="mb-2 flex justify-between py-2 gap-2 min-h-10 flex-wrap items-center">
        ${t.var(logoSrc)}
        ${t.var(new Lang("mr-auto"))}
        <nav class="flex gap-2 flex-wrap">
          ${t.var(new Link("/about", i18n.tr("about"), "underline"))}
          ${t.var(new Link("/documentation", i18n.tr("documentation"), "underline"))}
          ${t.var(new Link("/blog", i18n.tr("blog"), "underline"))}
        </nav>
      </header>`,
    ).value(o);

    return this;
  }
}
