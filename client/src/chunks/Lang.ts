import {
	applied,
	EventType,
	lateShared,
	of
} from "silentium";
import { constant, template } from "silentium-components";
import { button } from "../components/Button";
import { langSrc } from "../store";

const active = (lang: string) => applied(langSrc.event, (l) => (l === lang ? "font-bold" : ""));

export const lang = (classSrc: EventType<string>): EventType<string> => (user) => {
	const selectRu = lateShared();
	const selectEn = lateShared();

	constant("ru", selectRu.event)(langSrc.use);
	constant("en", selectEn.event)(langSrc.use);

	const t = template();
	t.template(
		`<nav class="px-2 ${t.var(classSrc)}">
        ${t.var(button(of("ru"), active("ru"), selectRu.use))}
        ${t.var(button(of("en"), active("en"), selectEn.use))}
      </nav>`,
	);
	t.value(user);
}
