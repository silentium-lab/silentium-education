import { DataType } from "silentium";
import { template } from "silentium-components";
import { i18n, titleSrc } from "../store";

export const documentation = (): DataType<string> => {
	return function Documentation(u) {
		const title = i18n.tr("documentation");
		title(titleSrc.give);

		const t = template();
		t.template(`<div class="article">
		<h1 class="title-1">${t.var(title)}</h1>
		</div>`);
		t.value(u);
	}
}
