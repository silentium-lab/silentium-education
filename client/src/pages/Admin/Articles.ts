import { type OwnerType, TheInformation } from "silentium";
import { Template, ToJson } from "silentium-components";
import { backendCrudSrc } from "../../bootstrap";
import { Link } from "../../components/Link";
import { i18n, titleSrc } from "../../store";

export class Articles extends TheInformation {
	value(o: OwnerType<unknown>): this {
		const title = i18n.tr("Articles").value(titleSrc);

    const r = new ToJson(backendCrudSrc.ofModelName('articles').list());

		const t = new Template();
		t.template(`<div class="article">
        <h1 class="title-1">${t.var(title)}</h1>
        ${t.var(r)}
        <div>
          ${t.var(new Link("/admin/articles/1", i18n.tr("Article 1"), "underline"))}
        </div>
      </div>`).value(o);

		return this;
	}
}
