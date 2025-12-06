import { Lang } from "@/chunks/Lang";
import { logoSrc } from "@/chunks/Logo";
import { Link } from "@/components/Link";
import { Tr } from "@/store";
import { Of } from "silentium";
import { Template } from "silentium-components";

export function Header() {
  return Template(
    (
      t,
    ) => `<header class="mb-2 flex justify-between py-2 gap-2 min-h-10 flex-wrap items-center">
      ${t.var(logoSrc)}
      ${t.var(Lang(Of("mr-auto")))}
      <nav class="flex gap-2 flex-wrap">
        ${t.var(Link(Of("/about"), Tr("about"), Of("underline")))}
        ${t.var(Link(Of("/documentation"), Tr("documentation"), Of("underline")))}
        ${t.var(Link(Of("/blog"), Tr("blog"), Of("underline")))}
      </nav>
    </header>`,
  );
}
