import { Applied, EventType, LateShared, Of } from "silentium";
import { langSrc } from "../store";
import { Constant, Template } from "silentium-components";
import { Button } from "../components/Button";

const Active = (lang: string) =>
	Applied(langSrc.event, (l) => (l === lang ? "font-bold" : ""));

export function Lang(classSrc: EventType<string>): EventType<string> {
	return (user) => {
		const selectRu = LateShared();
		const selectEn = LateShared();

		Constant("ru", selectRu.event)(langSrc.use);
		Constant("en", selectEn.event)(langSrc.use);

		const t = Template();
		t.template(
			`<nav class="px-2 ${t.var(classSrc)}">
			${t.var(Button(Of("ru"), Active("ru"), selectRu.use))}
			${t.var(Button(Of("en"), Active("en"), selectEn.use))}
		</nav>`,
		);
		t.value(user);
	};
}
