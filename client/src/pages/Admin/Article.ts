import { type OwnerType, TheInformation } from "silentium";
import { Template } from "silentium-components";
import { i18n, titleSrc } from "../../store";
import { Link } from "../../components/Link";

export class Article extends TheInformation {
	value(o: OwnerType<unknown>): this {
		const title = i18n.tr("Article").value(titleSrc);

		const t = new Template();
		t.template(`<div class="article">
			${t.var(new Link("/admin/articles", i18n.tr("Articles"), "underline"))}
        <h1 class="title-1">${t.var(title)}</h1>
      </div>`).value(o);

		return this;
	}
}
