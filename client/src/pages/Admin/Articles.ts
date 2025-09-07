import { From, Of, type OwnerType, TheInformation } from "silentium";
import { FromJson, Path, Template, ToJson } from "silentium-components";
import { i18n, titleSrc } from "../../store";
import { Link } from "../../components/Link";
import { backendCrudSrc, backendTransport } from "../../bootstrap";

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
