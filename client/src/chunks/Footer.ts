import { Of, type OwnerType, TheInformation } from "silentium";
import { Template } from "silentium-components";
import { LinkExternal } from "../components/LinkExternal";
import { i18n } from "../store";
import { logoSrc } from "./Logo";

export class Footer extends TheInformation<string> {
	public value(o: OwnerType<string>): this {
		const t = new Template();
		t.template(
			`<footer class="mt-auto py-2 flex justify-between items-center gap-2 flex-wrap">
        <span>
          ${t.var(new Of(new Date().getFullYear().toString()))}
          &copy;
        </span>
        <div class="px-2 mr-auto">
          ${t.var(new LinkExternal("https://t.me/silentium_js", i18n.tr("tg_group")))}
        </div>
        ${t.var(logoSrc)}
      </footer>`,
		).value(o);

		return this;
	}
}
