import { Event, type EventType, Of } from "silentium";
import { Template } from "silentium-components";
import { Counter } from "@/chunks/Counter";
import { Link } from "@/components/Link";
import { i18n, titleSrc } from "@/store";

export function Home(): EventType<string> {
  return Event((transport) => {
    i18n.tr("home").event(titleSrc);
    const t = Template();
    t.template(
      `<section class="article">
			<h1 class="title-1">
			Silentium
			</h1>
			<div class="mb-3">${t.var(Counter())}</div>
			<div>
				${t.var(Link(Of("/admin/articles"), Of("Статьи"), Of("underline")))}
			</div>
		</section>`,
    );
    t.event(transport);
    return function homeDestroy() {
      t.destroy();
    };
  });
}
