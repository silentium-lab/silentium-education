import { DataType, of } from "silentium";
import { template } from "silentium-components";
import { link } from "../components/Link";
import { i18n } from "../store";
import { lang } from "./Lang";
import { logoSrc } from "./Logo";

export const header = (): DataType<string> => (user) => {
		const t = template();
		t.template(
			`<header class="mb-2 flex justify-between py-2 gap-2 min-h-10 flex-wrap items-center">
        ${t.var(logoSrc)}
        ${t.var(lang(of("mr-auto")))}
        <nav class="flex gap-2 flex-wrap">
          ${t.var(link(of("/about"), i18n.tr("about"), of("underline")))}
          ${t.var(link(of("/documentation"), i18n.tr("documentation"), of("underline")))}
          ${t.var(link(of("/blog"), i18n.tr("blog"), of("underline")))}
        </nav>
      </header>`,
		)
    t.value(user);
}
