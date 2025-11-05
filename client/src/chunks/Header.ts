import { Event, type EventType, Of } from "silentium";
import { Template } from "silentium-components";
import { Link } from "@/components/Link";
import { i18n } from "@/store";
import { Lang } from "@/chunks/Lang";
import { logoSrc } from "@/chunks/Logo";

export function Header(): EventType<string> {
  return Event((transport) => {
    const t = Template();
    t.template(
      `<header class="mb-2 flex justify-between py-2 gap-2 min-h-10 flex-wrap items-center">
          ${t.var(logoSrc)}
          ${t.var(Lang(Of("mr-auto")))}
          <nav class="flex gap-2 flex-wrap">
            ${t.var(Link(Of("/about"), i18n.tr("about"), Of("underline")))}
            ${t.var(Link(Of("/documentation"), i18n.tr("documentation"), Of("underline")))}
            ${t.var(Link(Of("/blog"), i18n.tr("blog"), Of("underline")))}
          </nav>
        </header>`,
    );
    t.event(transport);
  });
}
