import { type OwnerType, TheInformation } from "silentium";
import { Template } from "silentium-components";
import { i18n, titleSrc } from "../../store";

export class Articles extends TheInformation {
	value(o: OwnerType<unknown>): this {
		const title = i18n.tr("Articles").value(titleSrc);

		const t = new Template();
		t.template(`<div class="article">
        <h1 class="title-1">${t.var(title)}</h1>
      </div>`).value(o);

		return this;
	}
}
