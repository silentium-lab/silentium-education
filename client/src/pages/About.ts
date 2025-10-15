import type { EventType } from "silentium";
import { Template } from "silentium-components";
import { Counter } from "../chunks/Counter";
import { i18n, titleSrc } from "../store";

export const About = (): EventType<string> => {
	return function AboutEvent(u) {
		const title = i18n.tr("about");
		title(titleSrc.use);
		const t = Template();
		t.template(
			`<section class="article">
        <h1 class="title-1">${t.var(title)}</h1>
        <div class="flex flex-col gap-1">
          <div>${t.var(Counter())}</div>
          <div>${t.var(Counter())}</div>
        </div>
      </section>`,
		);
		t.value(u);
		return function AboutDestroy() {
			t.destroy();
		};
	};
};
