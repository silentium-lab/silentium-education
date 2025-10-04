import {
	applied,
	DataType,
	lateShared,
	of
} from "silentium";
import { constant, template } from "silentium-components";
import { button } from "../components/Button";
import { langSrc } from "../store";

const active = (lang: string) => applied(langSrc.value, (l) => (l === lang ? "font-bold" : ""));

export const lang = (classSrc: DataType<string>): DataType<string> => (user) => {
	const selectRu = lateShared();
	const selectEn = lateShared();

	constant("ru", selectRu.value)(langSrc.give);
	constant("en", selectEn.value)(langSrc.give);

	const t = template();
	t.template(
		`<nav class="px-2 ${t.var(classSrc)}">
        ${t.var(button(of("ru"), active("ru"), selectRu.give))}
        ${t.var(button(of("en"), active("en"), selectEn.give))}
      </nav>`,
	);
	t.value(user);
}
