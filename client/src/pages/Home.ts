import { type EventType, Of } from "silentium";
import { Template } from "silentium-components";
import { counter } from "../chunks/Counter";
import { link } from "../components/Link";
import { i18n, titleSrc } from "../store";

export const Home = (): EventType<string> => {
	return function HomeEvent(u) {
		i18n.tr("home")(titleSrc.use);
		const t = Template();
		t.template(
			`<section class="article">
			<h1 class="title-1">
			Silentium
			</h1>
			<div class="mb-3">${t.var(counter())}</div>
			<div>
				${t.var(link(Of("/admin/articles"), Of("Статьи"), Of("underline")))}
			</div>
		</section>`,
		);
		t.value(u);
		return function homeDestroy() {
			t.destroy();
		};
	};
};
