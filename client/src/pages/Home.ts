import { Counter } from "@/chunks/Counter";
import { Link } from "@/components/Link";
import { Stencil } from "@/modules/render/Stencil";
import { $lang, $title, i18n } from "@/store";
import { Event, type EventType, Of } from "silentium";

export function Home(): EventType<string> {
  return Event((transport) => {
    i18n.tr("home").event($title);
    const t = Stencil();
    t.template(
      `<section class="article">
			<h1 class="title-1">
			Silentium
			</h1>
			<div class="mb-3">${t.var(Counter())}</div>
      <div>
        Lang: ${t.var($lang)}
      </div>
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
