import { DataType } from "silentium";
import { template } from "silentium-components";
import { counter } from "../chunks/Counter";
import { i18n, titleSrc } from "../store";

export const home = (): DataType<string> => {
	return (u) => {
		i18n.tr("home")(titleSrc.give);
		const t = template();
		t.template(
			`<section class="article">
			<h1 class="title-1">
			Silentium
			</h1>
			<div>${t.var(counter())}</div>
		</section>`,
		);
		t.value(u);
	}
}
