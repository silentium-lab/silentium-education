import { Counter } from "@/chunks/Counter";
import { Link } from "@/components/Link";
import { Stencil } from "@/modules/render/Stencil";
import { $lang, $title, i18n } from "@/store";
import { Message, Of } from "silentium";

export function Home() {
  return Message<string>((transport) => {
    i18n.tr("home").to($title);
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
    t.to(transport);
    return function homeDestroy() {
      t.destroy();
    };
  });
}
