import type { EventType } from "silentium";
import { template } from "silentium-components";
import { counter } from "../chunks/Counter";
import { i18n, titleSrc } from "../store";

export const about = (): EventType<string> => {
	return function About(u) {
		const title = i18n.tr("about");
		title(titleSrc.use);
		const t = template();
		t.template(
			`<section class="article">
        <h1 class="title-1">${t.var(title)}</h1>
        <div class="flex flex-col gap-1">
          <div>${t.var(counter())}</div>
          <div>${t.var(counter())}</div>
        </div>
      </section>`,
		);
		t.value(u);
		return function AboutDestroy() {
			t.destroy();
		};
	};
};
