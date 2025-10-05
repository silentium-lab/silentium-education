import { DataType, of } from "silentium";
import { template } from "silentium-components";
import { counter } from "../chunks/Counter";
import { i18n, titleSrc } from "../store";
import { link } from "../components/Link";

export const home = (): DataType<string> => {
	return function Home(u) {
		i18n.tr("home")(titleSrc.give);
		const t = template();
		t.template(
			`<section class="article">
			<h1 class="title-1">
			Silentium
			</h1>
			<div class="mb-3">${t.var(counter())}</div>
			<div>
				${t.var(link(of('/admin/articles'), of('Статьи'), of('underline')))}
			</div>
		</section>`,
		);
		t.value(u);
		return function homeDestroy() {
			t.destroy();
		}
	}
}
