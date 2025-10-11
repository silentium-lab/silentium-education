import { EventType } from "silentium";
import { template } from "silentium-components";
import { i18n, titleSrc } from "../../store";

export const auth = (): EventType<string> => {
	return (user) => {
		const title = i18n.tr("Auth")
		title(titleSrc.use);
		const t = template();
		t.template(`<div class="article">
			<h1 class="title-1">${t.var(title)}</h1>
		</div>`);
	    t.value(user);
	}
}
