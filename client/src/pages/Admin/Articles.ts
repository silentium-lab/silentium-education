import { type OwnerType, TheInformation } from "silentium";
import { Template } from "silentium-components";
import { i18n, titleSrc } from "../../store";
import { Link } from "../../components/Link";

export class Articles extends TheInformation {
	value(o: OwnerType<unknown>): this {
		const title = i18n.tr("Articles").value(titleSrc);

		const t = new Template();
		t.template(`<div class="article">
        <h1 class="title-1">${t.var(title)}</h1>
        <div>
          ${t.var(new Link("/admin/articles/1", i18n.tr("Article 1"), "underline"))}
        </div>
        <div>
          ${t.var(new Link("/admin/articles/2", i18n.tr("Article 2"), "underline"))}
        </div>
        <div>
          ${t.var(new Link("/admin/articles/3", i18n.tr("Article 3"), "underline"))}
        </div>
      </div>`).value(o);

		return this;
	}
}
